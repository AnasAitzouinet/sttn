"use client";
import React, { useEffect } from "react";
import { Data, columns } from "@/components/costumeInputs/column";
import { DataTable } from "@/components/costumeInputs/data-table";
import SearchBar from "@/components/SearchBar";
import AdminRes from "@/components/Reservations/AdminRes";

async function getData(): Promise<Data[]> {
  const res = await fetch(
    "https://gestionres-production.up.railway.app/ResTrip/",
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

const Admin = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const statue = data.map((item) => item.statue);
  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, [statue]);
14*9
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
        <AdminRes>
          <span className="bg-blue-800 rounded-xl px-20 text-white font-semibold  py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            New
          </span>
        </AdminRes>
        <div className="w-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
};

export default Admin;
