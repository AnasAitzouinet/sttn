"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <img
        src="/rotate.png"
        alt="Logo of the company"
        className="object-contain w-full h-full p-16  sm:p-40 animate-spin-slow transition-all"
      />
    </div>
  );
};

export default Loader;
