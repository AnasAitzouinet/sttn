"use client";
import React, { useRef, useState } from "react";
import { Poppins, Montserrat } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const Montserrats = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Contact = () => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 31.629002328790715,
    lng: -7.99103320480957,
  };
  return (
    <main className={`h-screen w-screen relative ${Montserrats.className}`}>
      <div
        className="w-1/3 h-screen bg-cover bg-center bg-no-repeat z-10 bg-sky-900 absolute top-0 right-0
      "
        style={{
          backgroundImage: "url('/tee.jpg')",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="w-1/3 h-screen bg-cover bg-center bg-no-repeat z-10 bg-transparent
      backdrop-blur-lg
      absolute top-0 right-0
      "
      ></div>
      <div className="w-screen z-0 h-screen bg-[#eeeeee]  top-0 ">
        <div
          className="rounded-xl border border-gray-500 overflow-hidden  h-3/4 w-1/3 absolute z-30 top-20
                     right-[10rem]"
        >
          <LoadScript googleMapsApiKey="AIzaSyDAF9tcV12kHUEefCh1rZnmtMFuqGbIVGA">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
        <form
          className=" h-full  w-2/5 left-24 top-0 py-10 absolute
        flex flex-col justify-start items-center gap-2
        "
        >
          <h1 className="font-bold text-5xl text-center w-full text-black">
            Get in <span className="text-sky-400 capitalize">touch</span>
          </h1>
          <span className="text-gray-500 text-sm  font-medium text-center w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>
          <input
            type="text"
            placeholder={`Name`}
            className="mt-6 w-full border border-gray-400 rounded-full"
          />
          <input
            type="text"
            placeholder="Email "
            className="w-full border border-gray-400 rounded-full"
          />
          <input
            type="text"
            placeholder="Phone "
            className="w-full border border-gray-400 rounded-full"
          />
          <textarea
            cols={30}
            rows={8}
            placeholder="Message"
            className="w-full border border-gray-400 rounded-2xl"
          />
          <button
            className="border border-gray-400/40 bg-sky-400 w-full py-2 my-2
          hover:bg-sky-500 transition-all duration-300 ease-in-out
          text-white font-bold rounded-full"
          >
            Send
          </button>
          <aside className=" flex justify-center items-center  w-full pt-7 gap-5">
            <div className="flex justify-start items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <div className="flex flex-col leading-4">
                <h1 className="font-bold">Phone</h1>
                <span className="text-sky-500">+212 77 77 94 81 4</span>
              </div>
            </div>
            <div className="flex justify-start items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <div className="flex flex-col leading-4">
                <h1 className="font-bold">Phone</h1>
                <span className="text-sky-500">+212 77 77 94 81 4</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Contact;
