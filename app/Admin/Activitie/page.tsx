"use client";

import NewCol from "@/components/Add/NewCol";
import NewTrip from "@/components/Add/NewTrip";
import SearchBar from "@/components/SearchBar";
import { columns, Data } from "@/components/costumeInputs/ActiCol";
import { DataTable } from "@/components/costumeInputs/data-table";
import { useEffect, useState } from "react";

export default function Trips() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const SortData = (data: Data[]) => {
      return data.sort((a, b) => b.id - a.id);
    };
    const getTrips = async () => {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/Activity/"
      );
      const data = await res.json();
      if (res.ok) {
        setData(data);
        SortData(data);
      }
    };
    getTrips();
  }, [data]);
  return (
    <section className="bg-[#ebe9e9]">
      <header className="h-full w-full">
        <div className="w-full h-1/5  flex flex-col  justify-center items-start">
          <h1 className="text-gray-700 text-4xl font-bold px-5 py-5">Activities</h1>
          <SearchBar
            classDiv="w-full text-black py-3 bg-white z-0"
            placeholder="Search..."
            classInput="w-full text-black placeholder-gray-700 border-none "
          />
        </div>
      </header>
      <div className="w-full h-full p-5 flex flex-col justify-center items-start gap-3">
        <NewCol>
          <span className="bg-blue-800 rounded-xl px-20 text-white font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            New
          </span>
        </NewCol>
        <div className="w-full">
          <DataTable columns={columns} data={data} />
        </div>{" "}
      </div>
    </section>
  );
}
