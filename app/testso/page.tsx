"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl opacity-60
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl opacity-40
            `}
      />
      <Skeleton
        className={`h-[20rem] w-[22rem] border border-gray-400/40 rounded-xl opacity-10
            `}
      />
    </div>
  );
};

export default page;
