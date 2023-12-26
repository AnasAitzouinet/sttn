"use client";
import React from "react";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoLocationOutline } from "react-icons/io5";
import res from "@/components/Reservations/Reserverations";
import SkeletonSlider from "@/components/SkeletonSlider";
import { Info } from "lucide-react";
import ImagePrev from "@/components/costumeInputs/ImagePrev";

// const trips = [
//   {
//     id: 1,
//     title: "Adventure in the Mountains",
//     img: "https://images.pexels.com/photos/2604792/pexels-photo-2604792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 500,
//     description:
//       "Experience the thrill of hiking in the breathtaking mountain landscapes.",
//     city: "Mountainville",
//   },
//   {
//     id: 2,
//     title: "Beach Paradise Getaway",
//     img: "https://images.pexels.com/photos/1076240/pexels-photo-1076240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 800,
//     description:
//       "Relax on the sun-kissed beaches and enjoy water sports in the crystal-clear waters.",
//     city: "Beachtown",
//   },
//   {
//     id: 3,
//     title: "Historical Tour",
//     img: "https://images.pexels.com/photos/3278939/pexels-photo-3278939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 400,
//     description:
//       "Discover the rich history of our city with guided tours to iconic landmarks.",
//     city: "Historyburg",
//   },
//   {
//     id: 4,
//     title: "Cultural Exploration",
//     img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 600,
//     description:
//       "Immerse yourself in the diverse cultures and traditions of our city.",
//     city: "Culturalopolis",
//   },
//   {
//     id: 4,
//     title: "Cultural Exploration",
//     img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 600,
//     description:
//       "Immerse yourself in the diverse cultures and traditions of our city.",
//     city: "Culturalopolis",
//   },
//   {
//     id: 4,
//     title: "Cultural Exploration",
//     img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 600,
//     description:
//       "Immerse yourself in the diverse cultures and traditions of our city.",
//     city: "Culturalopolis",
//   },
//   {
//     id: 4,
//     title: "Cultural Exploration",
//     img: "https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price: 600,
//     description:
//       "Immerse yourself in the diverse cultures and traditions of our city.",
//     city: "Culturalopolis",
//   },
// ];

interface Trip {
  id: number;
  title: string;
  pictures: string[];
  price: number;
  description: string;
  city: string;
}
interface Props {
  filter?: string;
}
const Tours = ({ filter }: Props) => {
  const [hovered, setHovered] = React.useState<number | null>(null); // Initialize with null
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [Ftrips, setFtrips] = React.useState<Trip[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = React.useState<boolean>(false);
  const [currentImage, setCurrentImage] = React.useState(0);

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
    const getTrips = async () => {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/Trips/"
      );
      const data = await res.json();
      if (res.ok) {
        setLoading(true);
        setTrips(data);
      }
    };
    getTrips();
  }, []);

  React.useEffect(() => {
    if (filter) {
      const filterdTrips = trips.filter((trip) =>
        trip.title.toLowerCase().includes(filter.toLowerCase())
      );
      refs?.current?.update(sildeOptions);
      setFtrips(filterdTrips);
    } else if (filter == "") {
      refs?.current?.update(sildeOptions);
      setFtrips(trips);
    }
  }, [filter, trips, refs, sildeOptions]);

  return (
    <div ref={ref} className="keen-slider relative w-full">
      {!loading ? (
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

      {!loading ? (
        <SkeletonSlider />
      ) : (
        Ftrips.map((trip, index) => (
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
            <div
              className="keen-slider__slide h-full w-full relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40 "
              onMouseEnter={() => {
                setHovered(trip.id);
              }}
              onMouseLeave={() => setHovered(null)} // Reset to null on mouse leave
            >
              <img
                src={trip.pictures[0]}
                alt={trip.title}
                onLoad={() => setImagesLoaded(true)}
                className={`object-cover h-[10rem] sm:h-[17rem]  w-full duration-500 transition-all ease-in-out
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
                  {trip.city }
                </div>
              </div>
            </div>
          </ImagePrev>
        ))
      )}
    </div>
  );
};

export default Tours;
