"use client";
import React from "react";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoLocationOutline } from "react-icons/io5";
import res from "@/components/Reservations/Reserverations";
import { set } from "date-fns";
import SkeletonSlider from "@/components/SkeletonSlider";

interface Trip {
  id: number;
  title: string;
  img: string;
  price: number;
  description: string;
  place: string;
}

const Activites = () => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null
  const [activity, setActivity] = React.useState<Trip[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = React.useState<boolean>(false);
  const sildeOptions: KeenSliderOptions = React.useMemo(
    () => ({
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
    }),
    []
  );

  const [ref, refs] = useKeenSlider<HTMLDivElement>(sildeOptions);
  React.useEffect(() => {
    if (imagesLoaded && refs.current) {
      refs.current.update(sildeOptions);
    }
  }, [refs, sildeOptions, imagesLoaded]);

  React.useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await fetch(
          "https://gestionres-production.up.railway.app/Activity/"
        );
        const data = await res.json();
        if (res.ok) {
          setLoading(true);
          setActivity(data);
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    getActivities();
  }, []);
  return (
    <div ref={ref} className="keen-slider relative w-full">
      {!loading ? (
        ""
      ) : (
        <div
          className="absolute top-0 right-0 w-[3%]  self-end h-full z-20 rounded-lg "
          style={{
            background:
              "linear-gradient(-90deg, rgb(8, 8, 8) 0%, transparent 100%)",
          }}
        ></div>
      )}
      {!loading ? (
        <SkeletonSlider />
      ) : (
        activity.map((trip) => (
          <res.ReserverationsActi key={trip.id} id={trip.id} title={trip.title}>
            <div
              className="keen-slider__slide h- relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
              onMouseEnter={() => setHovered(trip.id)}
              onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
            >
              <img
                src={trip.img}
                alt={trip.title}
                onLoad={() => setImagesLoaded(true)}
                className={`object-cover h-[17rem] w-full duration-500 transition-all ease-in-out
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
                  {trip.place}
                </div>
              </div>
            </div>
          </res.ReserverationsActi>
        ))
      )}
    </div>
  );
};

export default Activites;
