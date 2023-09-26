"use client";

import SearchBar from "@/components/SearchBar";
import React from "react";
import Tours from "./Tours";
import Other from "./Other";

const Destinations = () => {
  return (
    <main
      className="h-full w-screen bg-cover bg-center bg-no-repeat  "
      style={{
        backgroundImage: "url('/pe.jpg')",
        backgroundAttachment: "fixed", // Add this line
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-full w-screen  "
        style={{
          background:
            "linear-gradient(180deg, rgb(8, 8, 8) 4%, transparent 70%)",
        }}
      >
        <nav className="w-screen flex flex-col items-center justify-center gap-1  py-2 ">
          {/* <h1 className="text-white font-semibold text-3xl ">Destinations</h1> */}
          <SearchBar />
        </nav>
        <section
          className="
        px-5 py-5  gap-2 flex flex-col
        "
        >
          <h1
            className="
          text-3xl text-white font-bold px-8 
          "
          >
            Trips :
          </h1>
          <Tours />
        </section>
        <section
          className="
        px-5 py-5  gap-2 flex flex-col 
        "
        >
          <h1
            className="
          text-3xl text-white font-bold px-8 
          "
          >
            Activities :
          </h1>
          <Tours />
        </section>
        <section
          className="
        px-5 py-5  gap-2 flex flex-col
        "
        >
          <h1
            className="
          text-3xl text-white font-bold px-8 
          "
          >
            Others :  
          </h1>
          <Other />
        </section>
      </div>
    </main>
  );
};

export default Destinations;
