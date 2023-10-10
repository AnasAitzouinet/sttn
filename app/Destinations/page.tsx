"use client";

import SearchBar from "@/components/SearchBar";
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

const Destinations = () => {
  const [auth, setAuth] = useState<string | false | JwtPayload>(false);
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
      className="h-full w-screen bg-cover bg-center bg-no-repeat  "
      style={{
        backgroundImage: "url('/pe.jpg')",
        backgroundAttachment: "fixed", // Add this line
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-full w-screen  "
        style={{
          background:
            "linear-gradient(180deg, rgb(8, 8, 8) 4%, transparent 70%)",
        }}
      >
        <nav className="w-screen flex flex-row items-center justify-around gap-1  py-2 text-white font-extralight">
          <ul className="text-white flex items-center gap-5 font-extralight">
            <NavLink name="Home" paths="/" />
            <NavLink name="Destinations" paths="/Destinations" />
            <NavLink name="Who we are ?" paths="/Who-we-are" />
            <NavLink name="Contact us" paths="Contact-us" />
            
          </ul>
          <div className="flex gap-3 justify-center items-center">

          <SearchBar />
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
                  <NavLink name="Sign up"/>
                </Auth>
              )}
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
