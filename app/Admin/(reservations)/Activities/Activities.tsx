"use client";
import React, { useEffect } from "react";
import { Data, columns } from "@/components/costumeInputs/columnAct";
import { DataTable } from "@/components/costumeInputs/data-table";
import SearchBar from "@/components/SearchBar";
import ActivitieRes from "@/components/Reservations/ActiRes";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ExportToCsv } from "@/components/ExportCsv/ExportToCsv";

async function getData(): Promise<Data[]> {
    const res = await fetch(
        "https://gestionres-production.up.railway.app/ResAct/",
        {
            method: "get",
            cache: "no-store",
        }
    );
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
}
const Activities = () => {
    const [data, setData] = React.useState<Data[]>([]);
    const [filtredData, setFiltredData] = React.useState<Data[]>([]); // [
    const [filter, setFilter] = React.useState("");
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, [filtredData]);
    const handelSelect = (value: string) => {
        setFilter(value);
    };

    React.useEffect(() => {
        setFiltredData(data);
        switch (filter) {
            case "latestR":
                setFiltredData((prev) => [...prev.sort((a, b) => b.id - a.id)]);
                break;
            case "oldestR":
                setFiltredData((prev) => [...prev.sort((a, b) => a.id - b.id)]);
                break;
            case "MPeople":
                setFiltredData((prev) => [
                    ...prev.sort(
                        (a, b) => parseInt(b.nbrPerson) - parseInt(a.nbrPerson)
                    ),
                ]);
                break;
            case "LPeople":
                setFiltredData((prev) => [
                    ...prev.sort(
                        (a, b) => parseInt(a.nbrPerson) - parseInt(b.nbrPerson)
                    ),
                ]);
                break;
            case "MPricePrivate":
                setFiltredData((prev) => [
                    ...prev.sort((a, b) => b.activity.pricePrivate - a.activity.pricePrivate),
                ]);
                break;
            case "LPricePrivate":
                setFiltredData((prev) => [
                    ...prev.sort((a, b) => a.activity.pricePrivate - b.activity.pricePrivate),
                ]);
                break;
            case "MPriceShuttle":
                setFiltredData((prev) => [
                    ...prev.sort((a, b) => b.activity.priceShutlle - a.activity.priceShutlle),
                ]);
                break;
            case "LPriceShuttle":
                setFiltredData((prev) => [
                    ...prev.sort((a, b) => a.activity.priceShutlle - b.activity.priceShutlle),
                ]);
                break;
            case "Shuttle":
                setFiltredData((prev) => [
                    ...prev.filter((item) => item.type === "shuttle"),
                ]);
                break;
            case "Private":
                setFiltredData((prev) => [
                    ...prev.filter((item) => item.type === "private"),
                ]);
                break;
            default:
                setFiltredData(data);
        }
        if (date?.from && date?.to) {
            setFiltredData((prev) => [
                ...prev.filter(
                    (item) =>
                        new Date(item.date) >= date.from! &&
                        new Date(item.date) <= date.to!
                ),
            ]);
        }
    }, [filter, data, date?.from, date?.to]);
    return (
        <section className="bg-[#ebe9e9]">
            <header className="h-full w-full">
                <div className="w-full h-1/5  flex flex-col  justify-center items-start">
                    <h1 className="text-gray-700 text-4xl font-bold px-5 py-5">
                        Reservations Activities
                    </h1>
                    <SearchBar
                        classDiv="w-full text-black py-3 bg-white z-0"
                        placeholder="Search..."
                        classInput="w-full text-black placeholder-gray-700 border-none "
                    />
                </div>
            </header>
            <div className="w-full h-full  p-5 flex flex-col justify-center items-start gap-3 ">
                <div className="flex w-full justify-between items-center">

                    <ActivitieRes>
                        <span className="bg-blue-800 rounded-xl px-20 text-white left-0 font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            New
                        </span>
                    </ActivitieRes>
                    <div className="flex gap-5 flex-row-reverse">
                        <span
                            onClick={
                                () => {
                                    ExportToCsv({ data: data, filename: "Reservationsactivitys" })
                                }
                            }
                            className="cursor-pointer bg-green-800 rounded-xl px-10 text-white font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            Export to Csv
                        </span>
                        <Select onValueChange={handelSelect}>
                            <SelectTrigger className="w-[180px] rounded-xl">
                                <SelectValue placeholder="Filter by" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl ">
                                <SelectGroup>
                                    <SelectItem className="rounded-xl" value="latestR">
                                        Latest Reservations
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="oldestR">
                                        Oldest Reservations
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="MPeople">
                                        Most People
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="LPeople">
                                        Less People
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="MPricePrivate">
                                        Most Price in Private
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="LPricePrivate">
                                        Less Price in Private
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="MPriceShuttle">
                                        Most Price in Shuttle
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="LPriceShuttle">
                                        Less Price in Shuttle
                                    </SelectItem>
                                    <SelectItem className="rounded-xl" value="Shuttle">
                                        Type Shuttle
                                    </SelectItem>

                                    <SelectItem className="rounded-xl" value="Private">
                                        Type Private
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal rounded-xl",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                                <Calendar
                                    className="rounded-xl"
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="w-full">
                    <DataTable columns={columns} data={filtredData} />
                </div>
            </div>
        </section>
    );
};

export default Activities;
