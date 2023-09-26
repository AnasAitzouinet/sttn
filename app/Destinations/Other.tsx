"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const trips = [
  {
    id: 1,
    title: "Drop Off at the Airport",
    img: "https://images.pexels.com/photos/16757167/pexels-photo-16757167/free-photo-of-airplane.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 500,
    description:
      "Experience the thrill of hiking in the breathtaking mountain landscapes.",
    city: "Reserver",
  },
  {
    id: 2,
    title: "Pick Up at the Airport",
    img: "https://images.pexels.com/photos/10965905/pexels-photo-10965905.jpeg",
    price: 800,
    description:
      "Relax on the sun-kissed beaches and enjoy water sports in the crystal-clear waters.",
    city: "Reserver",
  },
  {
    id: 3,
    title: "Something Else",
    img: "https://images.pexels.com/photos/9999715/pexels-photo-9999715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 400,
    description:
      "Discover the rich history of our city with guided tours to iconic landmarks.",
    city: "Reserver",
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

const Other = () => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });
  return (
    <div ref={ref} className="keen-slider">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="keen-slider__slide h-1/3 relative cursor-pointer rounded-xl  border border-gray-400/60"
          onMouseEnter={() => setHovered(trip.id)}
          onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
        >
          <img
            src={trip.img}
            alt={trip.title}
            className={`object-cover h-[50vh] w-[55vh] duration-500 transition-all ease-in-out
            ${hovered === trip.id ? "scale-125 duration-500 transition-all " : ""}
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
            <h2 className="text-white text-xl font-semibold text-center">
              {trip.title}
            </h2>
            <p className="text-gray-300 text-sm font-medium text-center">{trip.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Other;
