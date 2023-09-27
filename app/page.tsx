"use client";
import Cta from "@/components/cta";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
interface TestsoProps {
  children: React.ReactNode;
}
import { Crimson_Pro, Poppins } from "next/font/google";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Poppinss = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
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
];
const NavLink = ({ name }: { name: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const path = usePathname();
  return (
    <motion.li
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
            ${
              name === "Sign up"
                ? "border border-gray-400/40 bg-sky-200/20  text-center  text-white hover:bg-sky-400/10 transition-all duration-500 ease-in-out backdrop-blur-sm px-5 py-2 rounded-full"
                : ""
            }
        `}
    >
      <a href="#">{name}</a>
      <motion.div
        className="border-b border-white"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5 }}
        animate={{ width: name === "Home" ? "100%" : isHovered ? "100%" : 0 }}
      ></motion.div>
    </motion.li>
  );
};

export default function Home() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const col = useRef(null);
  const inViewCol = useInView(col, { once: true });
  const [open, setOpen] = useState(false);
  return (
    <main
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-no-repeat
      overflow-x-hidden relative 
      "
      style={{
        backgroundImage: "url('/ee.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <section
        className={`h-full w-full 
        flex flex-col justify-between items-center 
       ${Poppinss.className}`}
        style={{
          background:
            "linear-gradient(180deg, rgb(8, 8, 8) 2%, transparent 50%)",
        }}
      >
        <nav className=" w-full flex justify-between items-center px-7">
          <h1 className="py-3  text-center text-white font-bold text-3xl">
            Navbar
          </h1>
          <div className="text-white lg:hidden" onClick={() => setOpen(!open)}>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <motion.div
            initial={{ x: open ? "100%" : 0 }}
            animate={{ x: open ? 0 : "100%" }}
            transition={{ duration: 0.5 }}
            className={`h-full w-2/3 fixed top-0 right-0 z-20 bg-gray-300 opacity-0
            transition-colors duration-500 ease-in-out flex flex-col items-center justify-start gap-16 
            ${
              open ? "shadow-[-30px_14px_100px_1px_#a0aec0] opacity-100 " : ""
            } `}
          >
            <button
              onClick={() => setOpen(!open)}
              className="text-left w-full px-2 py-3"
            >
              <AiOutlineClose />
            </button>
            <div>
              <ul className="text-gray-700 flex flex-col items-center gap-3 font-extralight w-full">
                <li>
                  <a href="#" className="flex gap-2 items-center justify-center ">
                  
                    Home
                  </a>
                </li>
                
                <li>
                  <a href="#">
    
                    Who we are ?
                    
                    </a>
                </li>
                <li>
                  <a href="#">Destinations</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <div className="border w-3/4 border-gray-900"></div>
                <li>
                  <a href="#">Sign up</a>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.7 }}
            className={
              open
                ? "h-full w-full fixed top-0 left-0 z-10 bg-transparent backdrop-blur-sm shadow-lg "
                : "hidden"
            }
          ></motion.div>
          <div className="hidden lg:flex">
            <ul className="text-white flex items-center gap-5 font-extralight">
              <NavLink name="Home" />
              <NavLink name="Destinations" />
              <NavLink name="Who we are ?" />
              <NavLink name="Contact us" />
              <NavLink name="Sign up" />
            </ul>
          </div>
        </nav>
        <section
          ref={ref}
          style={{
            transform: inView ? "none" : "translateY(200px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="flex flex-col justify-center items-center h-full w-full px-7 py-5 "
        >
          <article className="flex flex-col pt-9 justify-center   items-center    h-full">
            <h2 className="text-xl text-center sm:text-4xl text-gray-100 font-bold">
              TRAVEL AND SADDEL UP FOR THE JOURNEY
            </h2>
            <span className="text-sm sm:text-lg text-center  text-gray-400 font-bold">
              Exploring the World One Adventure at a Time
            </span>
            <Link
              href={"/Destinations"}
              prefetch={false}
              className="sm:w-1/4 w-full py-3 border border-gray-400/40 bg-sky-200/20  text-center
            text-white hover:bg-sky-400/10 transition-all duration-500 ease-in-out
            backdrop-blur-sm my-5 rounded-full"
            >
              Book Now
            </Link>
          </article>
          {/* <Cta /> */}
        </section>
        <div
          ref={col}
          className="py-5  w-full flex flex-col px-5 sm:pl-16 "
          style={{
            background: "linear-gradient(0deg, #fff 1%, transparent 20%)",
          }}
        >
          <h1
            className="text-white text-xl sm:text-2xl font-medium py-2 w-full"
            style={{
              transform: inViewCol ? "none" : "translateX(200px)",
              opacity: inViewCol ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Top Vacation Destinations
          </h1>
          <div
            className="flex sm:flex-row flex-col  justify-start items-center gap-3"
            style={{
              transform: inViewCol ? "none" : "translateX(200px)",
              opacity: inViewCol ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                className=" relative
                hover:scale-105 duration-500 transition-all ease-in-out
                h-[30vh] w-[47vh] cursor-pointer rounded-xl overflow-hidden border border-gray-400/60 "
              >
                <img
                  src={trip.img}
                  alt={trip.title}
                  className="object-cover h-[30vh] w-[55vh] rounded-  duration-500 transition-all ease-in-out"
                />
                <div
                  className={`absolute  top-0 left-0 text-center flex flex-col 
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
                  <p className="text-gray-300 text-sm font-medium text-center">
                    {trip.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
