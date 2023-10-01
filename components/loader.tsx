"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
interface LoaderProps {
  className?: string;
  imgClass?: string;
}
const Loader = ({className,imgClass}:LoaderProps) => {
  return (
    <div className={twMerge("w-screen h-screen overflow-hidden bg-gray-200",className)}>
      <img
        src="/rotate.png"
        alt="Logo of the company"
        className={twMerge("object-contain w-full h-full p-16  sm:p-40 animate-spin-slow transition-all",imgClass)}
      />
    </div>
  );
};

export default Loader;
