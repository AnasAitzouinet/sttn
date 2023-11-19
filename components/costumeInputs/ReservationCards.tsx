import React from "react";
import { Info } from "lucide-react";
interface ReservationCardsProps {
  img: string;
  title: string;
  type: string;
  date?: string;
  status: "ACCEPTED" | "PENDING" | "NOT_ACCEPTED";
  details: string;
}
export default function ReservationCards({
  img,
  title,
  type,
  date,
  status,
  details,
}: ReservationCardsProps) {
  return (
    <div className="h-[20rem] w-[22rem] relative lg:h-[17rem] lg:w-[19rem] my-2">
      <img
        src={img}
        className="object-cover rounded-xl h-[20rem] w-full lg:h-[18rem] lg:w-[20rem] duration-500 transition-all ease-in-out"
        alt=""
      />
      <span className="font-semibold absolute top-2 right-3 z-10  text-white flex justify-center items-center gap-1">
        <div
          className={`w-2 h-2 z-10 rounded-full bg-green-500 animate-pulse `}
        ></div>
        {type}
      </span>
      <span
        className={`font-semibold absolute top-2 left-3 z-10 
      ${status == "ACCEPTED" ? "text-green-500 " : ""}
      ${status == "PENDING" ? "text-orange-500 " : ""}
      ${status == "NOT_ACCEPTED" ? "text-red-500 " : ""}
      `}
      >
        <span className="text-gray-200">Status :</span>{" "}
        {status == "ACCEPTED"
          ? "Accepted"
          : status == "PENDING"
          ? "Pending"
          : status == "NOT_ACCEPTED"
          ? "Not Accepted"
          : ""}
      </span>
      <span className="font-semibold absolute top-8 text-gray-300 text-sm left-3 z-10 ">
        12/08/2035
      </span>
      <h1 className="font-semibold absolute bottom-10 text-2xl z-10 right-24 text-white">
        {title}
      </h1>
      <span className="font-semibold absolute bottom-4 text- z-10 left-[40%] text-gray-300 cursor-pointer flex gap-1">
        <span>details</span>
        <Info />
      </span>
    </div>
  );
}
