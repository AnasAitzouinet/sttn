"use client";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import SkeletonSlider from "@/components/SkeletonSlider";
import ImagePrev from "@/components/costumeInputs/ImagePrev";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";


interface Trip {
  id: number;
  title: string;
  pictures: string[];
  price: number;
  description: string;
  city: string;
}
const Tours = () => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const FetchTrips = React.useCallback(async () => {
    try {
      const respons = await fetch(
        "https://gestionres-production.up.railway.app/Trips/"
      );
      const data = await respons.json();
      setTrips(data);
    } catch (error) {
      console.log("Failed to fetch trips", error);
    }finally{
      setLoading(false)
    }
  }, []);

  React.useEffect(() => {
    FetchTrips();
  }, [FetchTrips]);

  return (
    <Swiper
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
      className=" relative w-full"
    >
      {loading ? (
        ""
      ) : (
        <div
          className="absolute top-0 right-0 w-[3%]  self-end h-full z-10 rounded-lg "
          style={{
            background:
              "linear-gradient(-90deg, rgb(8, 8, 8) 0%, transparent 100%)",
          }}
        ></div>
      )}
      {loading ? (
        <SkeletonSlider />
      ) : (
        trips.map((trip, index) => (
          <SwiperSlide
            key={trip.id}
            className="min-h-[10rem] sm:min-h-[17rem] w-full relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
            onMouseEnter={() => {
              setHovered(trip.id);
            }}
            onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
          >
            <ImagePrev
              type="Trip"
              key={trip.id}
              id={trip.id}
              title={trip.title}
              price={trip.price}
              description={trip.description}
              city={trip.city}
              images={trip.pictures}
            >
              <img
                src={trip.pictures[0]}
                alt={trip.title}
                className={`object-cover min-h-[10rem] sm:min-h-[17rem]  w-full duration-500 transition-all ease-in-out
            ${
              hovered === trip.id
                ? "scale-125 duration-500 transition-all "
                : "scale-105"
            }
            `}
              />
              <div
                className={`absolute top-0 left-0 text-center flex flex-col 
            items-center justify-end h-full w-full py-2 duration-500 transition-all ease-in-out
           
          `}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.9) 100%)",
                }}
              >
                <h2 className="text-white text-sm sm:text-xl font-semibold text-center">
                  {trip.title}
                </h2>
                <div
                  className="text-gray-300 text-xs sm:text-sm
            flex justify-center items-center gap-1
            font-medium w-full text-center"
                >
                  <IoLocationOutline />
                  {trip.city}
                </div>
              </div>
            </ImagePrev>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default Tours;
