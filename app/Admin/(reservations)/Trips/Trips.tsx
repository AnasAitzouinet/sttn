"use client";
import React, { useState, useEffect } from "react";
import { Data, columns, Trip } from "@/components/costumeInputs/column";
import { DataTable } from "@/components/costumeInputs/data-table";
import SearchBar from "@/components/SearchBar";
import AdminRes from "@/components/Reservations/AdminRes";
import { addDays, format, set } from "date-fns";
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
  const res = await fetch("https://gestionres-production.up.railway.app/ResTrip/", {
    method: "get",
    cache: "no-store",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
}

const Admin = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setFilteredData(data); // Initialize filteredData with the original data

    });
  }, []);

  useEffect(() => {
    const filteredData = applyFilters(data, filter, date);
    setFilteredData(filteredData); // Update the filteredData state
  }, [filter, date]);

  const applyFilters = (data: Data[], filter: string, dateRange: DateRange | undefined) => {
    let filteredData = [...data];

    switch (filter) {
      case "latestR":
        filteredData = filteredData.sort((a, b) => b.id - a.id);
        break;
      case "oldestR":
        filteredData = [...filteredData.sort((a, b) => a.id - b.id)];
        break;
      case "MPeople":
        filteredData = [...filteredData.sort((a, b) => parseInt(b.numberOfPersons) - parseInt(a.numberOfPersons))];
        break;
      case "LPeople":
        filteredData = [...filteredData.sort((a, b) => parseInt(a.numberOfPersons) - parseInt(b.numberOfPersons))];
        break;
      case "MPricePrivate":
        filteredData = [...filteredData.sort((a, b) => parseInt(b.trip.pricePrivate.toString()) - parseInt(a.trip.pricePrivate.toString()))];
        break;
      case "LPricePrivate":
        filteredData = [...filteredData.sort((a, b) => parseInt(a.trip.pricePrivate.toString()) - parseInt(b.trip.pricePrivate.toString()))];
        break;
      case "MPriceShuttle":
        filteredData = [...filteredData.sort((a, b) => parseInt(b.trip.priceShuttle.toString()) - parseInt(a.trip.priceShuttle.toString()))];
        break;
      case "LPriceShuttle":
        filteredData = [...filteredData.sort((a, b) => parseInt(a.trip.priceShuttle.toString()) - parseInt(b.trip.priceShuttle.toString()))];
        break;
      case "Shuttle":
        filteredData = filteredData.filter((item) => item.type === "shuttle");
        break;
      case "Private":
        filteredData = filteredData.filter((item) => item.type === "private");
        break;
      default:
        break;
    }

    if (dateRange?.from && dateRange?.to) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.dateFrom) >= dateRange.from! &&
          new Date(item.dateFrom) <= dateRange.to!
      );
    }

    return filteredData;
  };

  const handleSelect = (value: string) => {
    setFilter(value);
  };

  return (
    <section className="bg-[#ebe9e9]">
      <header className="h-full w-full">
        <div className="w-full h-1/5  flex flex-col  justify-center items-start">
          <h1 className="text-gray-700 text-4xl font-bold px-5 py-5">
            Reservations Trips
          </h1>
          <SearchBar
            classDiv="w-full text-black py-3 bg-white z-0"
            placeholder="Search..."
            classInput="w-full text-black placeholder-gray-700 border-none "
          />
        </div>
      </header>
      <div className="w-full h-full p-5 flex flex-col justify-center items-start gap-3 x">
        <div className="flex w-full justify-between items-center">
          <AdminRes>
            <span className="bg-blue-800 rounded-xl px-20 text-white font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              New
            </span>
          </AdminRes>
          <div className="flex gap-5 flex-row-reverse">
            <span
              onClick={
                () => {
                  ExportToCsv({ data: data, filename: "ReservationsTrips" })
                }
              }
              className="cursor-pointer bg-green-800 rounded-xl px-10 text-white font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              Export to Csv
            </span>
            <Select onValueChange={handleSelect}>
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
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </section>
  );
};

export default Admin;
