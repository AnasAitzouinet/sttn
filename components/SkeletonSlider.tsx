"use client";
import { Skeleton } from "./ui/skeleton";
import React from "react";

const SkeletonSlider = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl 
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl 
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl 
            `}
      />
    </div>
  );
};

export default SkeletonSlider;
