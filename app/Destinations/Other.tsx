"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
const trips = [
  {
    id: 1,
    title: "Drop Off at the Airport",
    img: "https://images.pexels.com/photos/16757167/pexels-photo-16757167/free-photo-of-airplane.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 500,
    type: "arrival",
    description:
      "Experience the thrill of hiking in the breathtaking mountain landscapes.",
    city: "Reserver",
  },
  {
    id: 2,
    title: "Pick Up at the Airport",
    img: "https://images.pexels.com/photos/10965905/pexels-photo-10965905.jpeg",
    price: 800,
    type: "departure",
    description:
      "Relax on the sun-kissed beaches and enjoy water sports in the crystal-clear waters.",
    city: "Reserver",
  },
];

import ReserverationD from "@/components/Reservations/ReserverationD";
interface Trip {
  id: number;
  title: string;
  img: string;
  price: number;
  description: string;
  city: string;
}

const Other = () => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null

  return (
    <Swiper
      className=" w-full"
      slidesPerView={1.5}
      centeredSlides={false}
      freeMode={true}
      breakpoints={{
        320: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },

        1024: {
          slidesPerView: 4.5,
          spaceBetween: 10,
        },
      }}
    >
      {trips.map((trip) => (
        <SwiperSlide
          key={trip.id}
          className=" min-h-[10rem] sm:min-h-[17rem] w-full relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
          onMouseEnter={() => setHovered(trip.id)}
          onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
        >
          <ReserverationD type={trip.type} key={trip.id}>
            <img
              src={trip.img}
              alt={trip.title}
              className={`object-cover duration-500 scale-105 transition-all ease-in-out
            ${
              hovered === trip.id
                ? "scale-125 duration-500 transition-all "
                : ""
            }
            `}
            />
            <div
              className={`absolute top-0 left-0 text-center flex flex-col 
            items-center justify-end h-full w-full py-2 duration-500 transition-all ease-in-out
          `}
              style={{
                borderRadius: "0.75rem",
                background:
                  "linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.9) 100%)",
              }}
            >
              <h2 className="text-white text-sm sm:text-xl font-semibold text-center">
                {trip.title}
              </h2>
              <p className="text-gray-300 font-medium text-center text-xs sm:text-sm">
                {trip.city}
              </p>
            </div>
          </ReserverationD>
        </SwiperSlide>
      ))}
      <SwiperSlide
        onClick={() => window.open("/Contact-us")}
        className=" min-h-[11rem] sm:min-h-[18.4rem] w-full relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
        onMouseEnter={() => setHovered(509)}
        onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
      >
        <img
          src="https://images.pexels.com/photos/9999715/pexels-photo-9999715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Something Else"
          className={`object-cover duration-500 scale-105 transition-all ease-in-out
            ${hovered === 509 ? "scale-125 duration-500 transition-all " : ""}
            `}
        />
        <div
          className={`absolute top-0 left-0 text-center flex flex-col 
            items-center justify-end h-full w-full py-2 duration-500 transition-all ease-in-out
          `}
          style={{
            borderRadius: "0.75rem",
            background:
              "linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.9) 100%)",
          }}
        >
          <h2 className="text-white text-sm sm:text-xl font-semibold text-center">
            Something Else
          </h2>
          <p className="text-gray-300 font-medium text-center text-xs sm:text-sm">
            Reserver
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Other;
