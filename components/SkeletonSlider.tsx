"use client";
import { Skeleton } from "./ui/skeleton";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const SkeletonSlider = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2 overflow-hidden">
      <Skeleton
        className={`min-h-[10rem] sm:min-h-[17rem] w-[17.5rem] border border-gray-400/40 rounded-xl 
            `}
      />
      <Skeleton
        className={`min-h-[10rem] sm:min-h-[17rem] w-[17.5rem] border border-gray-400/40 rounded-xl 
          `}
      />
      <Skeleton
        className={`min-h-[10rem] sm:min-h-[17rem] w-[17.5rem] border border-gray-400/40 rounded-xl 
        `}
      />
      <Skeleton
        className={`min-h-[10rem] sm:min-h-[17rem] w-[17.5rem] border border-gray-400/40 rounded-xl 
      `}
      />
      <Skeleton
            className={`min-h-[10rem] sm:min-h-[17rem] w-[9rem] border border-gray-400/40 rounded-xl 
            `}
          />
    </div>
  );
};

export default SkeletonSlider;
