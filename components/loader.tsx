"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
interface LoaderProps {
  className?: string;
  imgClass?: string;
}
const Loader = ({className,imgClass}:LoaderProps) => {
  return (
    <div className={twMerge("w-screen h-screen overflow-hidden bg-transparent",className)}>
      <img
        src="/AAT_AVATAR.png"
        alt="Logo of the company"
        className={twMerge("object-contain w-full h-full p-14  sm:p-40 animate-pulse transition-all",imgClass)}
      />
    </div>
  );
};

export default Loader;
