"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <Skeleton
          className={`h-[20rem] w-[20rem] border border-gray-400/40 rounded-xl
            `}
        />
    </div>
  );
};

export default page;
