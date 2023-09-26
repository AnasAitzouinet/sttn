"use client";
import React from "react";

const Image = [
  {
    id: 2,
    src: "/tripadvisor-lockup-horizontal-secondary-registered.svg",
    alt: "tripadvisor",
  },
  {
    id: 3,
    src: "/trustpilot-1.svg",
    alt: "trustpilot",
  },
];
const Cta = () => {
  return (
    <div className="px-5 py-5 w-full">
      <h3 className="sm:text-2xl font-bold  uppercase text-gray-300 ">Trusted By :</h3>
      <div className="flex flex-row justify-start items-start w gap-10">
        {Image.map((image) => (
          <img src={image.src} alt={image.alt} key={image.id} 
          className="h-6 sm:h-10 w-auto object-cover  opacity-90 "
          />
        ))}
      </div>
    </div>
  );
};

export default Cta;
