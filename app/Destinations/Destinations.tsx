"use client";

import React from "react";
import Tours from "./Tours";
import Other from "./Other";
import NavLink from "@/components/Navbar";
import Activites from "./Activities";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Auth from "@/components/Auth/Auth";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { RiAccountCircleFill } from "react-icons/ri";

const Destinations = () => {
    const [auth, setAuth] = useState<string | false | JwtPayload>(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            const result = await CheckAuth();
            setAuth(result);
        };

        checkAuth();
    }, []);
    return (
        <main
            className="h-full w-screen bg-cover relative bg-center bg-no-repeat "
            style={{
                backgroundImage: "url('/pe.jpg')",
                backgroundAttachment: "fixed", // Add this line
                backgroundSize: "fit",
            }}
        >
            <div
                className="h-full w-screen"
                style={{
                    background:
                        "linear-gradient(180deg, rgb(8, 8, 8) 4%, transparent 70%)",
                }}
            >
                <nav className=" w-full flex justify-between items-center px-7 z-50">
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
                                    <a href="/Destinations">Destinations</a>
                                </li>
                                <li>
                                    <a href="/Contact-us">Contact us</a>
                                </li>
                                <div className="border w-3/4 border-gray-900"></div>
                                <Auth>
                                    <li>Sign up</li>
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
                            <NavLink name="Contact us" paths="Contact-us" />
                            {auth ? (
                                <Avatar
                                    onClick={() => router.push("/Profile")}
                                    className="cursor-pointer"
                                >
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="capitalize">
                                        {
                                            //@ts-ignore
                                            auth.name
                                                .split(" ")
                                                .map((name: string) => name[0])
                                                .join("")
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <Auth>
                                    <li>
                                        <RiAccountCircleFill className="w-12 h-12 " />
                                    </li>
                                </Auth>
                            )}
                        </ul>
                    </div>
                </nav>

                <section
                    className="
        px-5 py-5  gap-2 flex flex-col 
        "
                >
                    <h1
                        className="
          text-3xl text-white font-bold px-8 
          "
                    >
                        Trips :
                    </h1>
                    <Tours />
                </section>
                <section
                    className="
        px-5 py-5  gap-2 flex flex-col 
        "
                >
                    <h1
                        className="
          text-3xl text-white font-bold px-8 
          "
                    >
                        Activities :
                    </h1>
                    <Activites />
                </section>
                <section
                    className="
        px-5 py-5  gap-2 flex flex-col
        "
                >
                    <h1
                        className="
          text-3xl text-white font-bold px-8 
          "
                    >
                        Others :
                    </h1>
                    <Other />
                </section>
            </div>
        </main>
    );
};

export default Destinations;
