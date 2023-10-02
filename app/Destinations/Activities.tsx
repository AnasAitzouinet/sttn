"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoLocationOutline } from "react-icons/io5";
import res from "@/components/Reservations/Reserverations";
const trips = [
  {
    id: 1,
    title: "Adventure in the Mountains",
    img: "https://images.pexels.com/photos/2604792/pexels-photo-2604792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 500,
    description:
      "Experience the thrill of hiking in the breathtaking mountain landscapes.",
    city: "Mountainville",
  },
  {
    id: 2,
    title: "Beach Paradise Getaway",
    img: "https://images.pexels.com/photos/1076240/pexels-photo-1076240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 800,
    description:
      "Relax on the sun-kissed beaches and enjoy water sports in the crystal-clear waters.",
    city: "Beachtown",
  },
  {
    id: 3,
    title: "Historical Tour",
    img: "https://images.pexels.com/photos/3278939/pexels-photo-3278939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 400,
    description:
      "Discover the rich history of our city with guided tours to iconic landmarks.",
    city: "Historyburg",
  },
  {
    id: 4,
    title: "Cultural Exploration",
    img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 600,
    description:
      "Immerse yourself in the diverse cultures and traditions of our city.",
    city: "Culturalopolis",
  },
  {
    id: 4,
    title: "Cultural Exploration",
    img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 600,
    description:
      "Immerse yourself in the diverse cultures and traditions of our city.",
    city: "Culturalopolis",
  },
  {
    id: 4,
    title: "Cultural Exploration",
    img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 600,
    description:
      "Immerse yourself in the diverse cultures and traditions of our city.",
    city: "Culturalopolis",
  },
  {
    id: 4,
    title: "Cultural Exploration",
    img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 600,
    description:
      "Immerse yourself in the diverse cultures and traditions of our city.",
    city: "Culturalopolis",
  },
];

interface Trip {
  id: number;
  title: string;
  img: string;
  price: number;
  description: string;
  city: string;
}

const Activites = () => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2.5, spacing: 5, origin: "auto" },
      },
      "(min-width: 768px)": {
        slides: { perView: 3.5, spacing: 15, origin: "auto" },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.5, spacing: 15, origin: "auto" },
      },
    },
    slides: { perView: 2, spacing: 5 },
  });
  return (
    <div ref={ref} className="keen-slider relative w-full">
      <div
        className="absolute top-0 right-0 w-[3%]  self-end h-full z-20 rounded-lg "
        style={{ 
          background:
            "linear-gradient(-90deg, rgb(8, 8, 8) 0%, transparent 100%)",
        }}
      ></div>
      {trips.map((trip) => (
        <res.ReserverationsActi key={trip.id} id={trip.id} title={trip.title}>
          <div
            className="keen-slider__slide h- relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
            onMouseEnter={() => setHovered(trip.id)}
            onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
          >
            <img
              src={trip.img}
              alt={trip.title}
              className={`object-cover h-full w-full duration-500 transition-all ease-in-out
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
          </div>
        </res.ReserverationsActi>
      ))}
    </div>
  );
};

export default Activites;
