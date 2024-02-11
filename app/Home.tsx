"use client";
import Cta from "@/components/cta";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Poppins } from "next/font/google";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Auth from "@/components/Auth/Auth";
import NavLink from "@/components/Navbar";
import { useRouter } from "next/navigation";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { JwtPayload } from "jsonwebtoken";
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
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiAccountBoxFill, RiAccountCircleFill } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const col = useRef(null);
  const inViewCol = useInView(col, { once: true });
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState<string | false | JwtPayload>(false);
  useEffect(() => {
    const checkAuth = async () => {
      const result = await CheckAuth();
      setAuth(result);
    };

    checkAuth();
  }, []);

  return (
    <main
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-no-repeat
      overflow-x-hidden relative 
      "
      style={{
        backgroundImage: "url('/Home.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <section
        className={`h-full w-full 
        flex flex-col justify-between items-center 
       ${Poppinss.className}`}
      // style={{
      //   background:
      //     "linear-gradient(180deg, rgb(8, 8, 8) 2%, transparent 50%)",
      // }}
      >
        <nav className=" w-full flex justify-between items-center py-4 px-7">
          {/* <h1 className="py-3  text-center text-white font-bold text-3xl">
            STTN
          </h1> */}
          <img
            src="/AAT_AVATAR.png"
            alt="logo"
            className="h-16 w-16 object-cover"
          />
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
            transition={{ duration: 0.2 }}
            className={`h-full w-2/3 fixed top-0 right-0 z-20 bg-gray-300 opacity-0
            transition-colors  ease-in-out flex flex-col items-center justify-start gap-16 
            ${open ? "shadow-[-30px_14px_100px_1px_#a0aec0] opacity-100 " : ""
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
                  <a
                    href="/"
                    className="flex gap-2 items-center justify-center "
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a href="/Who-we-are">Who we are ?</a>
                </li>
                <li>
                  <a href="/Destinations">Destinations</a>
                </li>
                <li>
                  <a href="/Contact-us">Contact us</a>
                </li>
                <div className="border w-3/4 border-gray-900"></div>
                <Auth>
                  <li>
                    Log in
                  </li>
                </Auth>
              </ul>
            </div>
          </motion.div>
          <motion.div
            onClick={() => setOpen(!open)}
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
              <NavLink name="Home" paths="/" />
              <NavLink name="Destinations" paths="/Destinations" />
              <NavLink name="Who we are ?" paths="/Who-we-are" />
              <NavLink name="Contact us" paths="Contact-us" />
              {auth ? (
                <Avatar
                  onClick={() => router.push("/Profile")}
                  className="cursor-pointer"
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="capitalize">{
                    //@ts-ignore
                    auth.name.split(" ").map((name) => name[0]).join("")
                  }</AvatarFallback>
                </Avatar>
              ) : (
                <Auth>
                  {/* <NavLink name="Account" /> */}
                  <li>
                    <RiAccountCircleFill  className="w-12 h-12 " />
                  </li>
                </Auth>
              )}
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
          className=" py-5  w-full flex flex-col px-5 sm:pl-16 "
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
                className=" relative sm:h-[25vh] sm:w-[47vh]
                hover:scale-105 duration-500 transition-all ease-in-out
                h-[30vh] w-[35vh] cursor-pointer rounded-xl overflow-hidden border border-gray-400/60 "
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
        <div className=" w-full h-[10%] my-8 flex justify-between  items-center  px-5 ">

          <div className="flex  flex-row justify-center items-center gap-2 bg-transparent backdrop-blur-xl border border-gray-400/30 rounded-full px-5 py-2 ">
            <h1 className="cursor-pointer text-sm text-gray-400 hover:text-white transition-all duration-500 px-2">
              © 2024 Atlas Adventure Transit LTD, Inc. All rights reserved.
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 bg-transparent backdrop-blur-xl border border-gray-400/30 rounded-full px-5 py-2">
              <FaFacebookF className="text-white text-2xl cursor-pointer hover:text-blue-500 transition-all duration-500" />
              <FaInstagram className="text-white text-2xl cursor-pointer hover:text-pink-500 transition-all duration-500" />
              <FaWhatsapp className="text-white text-2xl cursor-pointer hover:text-green-500 transition-all duration-500" />
            </div>

            <div className="flex  flex-row gap-2 bg-transparent backdrop-blur-xl border border-gray-400/30 rounded-full px-5 py-2 divide-x-2 divide-cyan-50 ">
              <h1 className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 px-2">Privacy </h1>
              <h1 className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 px-2">Refund Policies</h1>
              <h1 className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 px-2">Terms</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
