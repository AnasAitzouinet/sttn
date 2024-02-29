"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Burger from "@/components/icons/burger";
import Xmark from "@/components/icons/x-mark";
import Users from "@/components/icons/Users";
import { useRouter } from "next/navigation";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { JwtPayload } from "jsonwebtoken";
import Contacts from "./Contacts/page";
interface layoutProps {
  children: React.ReactNode;
}


const LayoutAdmin = ({ children }: layoutProps) => {
  const [opened, setOpen] = useState(false);
  const router = useRouter();
  const [auth, setAuth] = useState<string | false | JwtPayload>(false);
  useEffect(() => {
    const checkAuth = async () => {
      const result = await CheckAuth();
      console.log(result);
      if (result === false) router.push("/");
      if (result && (result as JwtPayload).role !== "ADMIN") router.push("/");
    };
    checkAuth();
  }, []);
  return (
    <main className="relative ">
      <motion.aside
        initial={{ width: "5%" }}
        animate={{ width: opened ? "20%" : "5%" }}
        className="bg-white h-full w-1/5 fixed 
        shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        border-gray-900 top-0 left-0 z-50"
      >
        <div
          className={`flex flex-col justify-start w-full h-full transition-all duration-300 ease-in-out ${opened ? "items-end" : " items-center"
            }`}
        >
          {opened ? (
            <motion.div
              className="cursor-pointer"
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              animate={{ rotate: opened ? 0 : 180 }}
              onClick={() => setOpen(!opened)}
            >
              <Xmark className="w-12 h-12 text-black" fill="#000" />
            </motion.div>
          ) : (
            <motion.div
              className="cursor-pointer"
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              animate={{ rotate: opened ? 0 : 180 }}
              onClick={() => setOpen(!opened)}
            >
              <Burger className="w-12 h-12 " fill="#000" />
            </motion.div>
          )}
          <div className="flex flex-col w-full h-full justify-start items-center py-5 px-2 gap-2">
            <div
              onClick={() => router.push("/Admin/")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
            bg-[#1f2937] rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Res Trips
              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Activities")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Res Activities
              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Users")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                All users

              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Trips")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-700 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Trip
              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Activitie")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-700 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Activities
              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Contacts")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-700 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Contacts
              </motion.span>
            </div>
            <div
              onClick={() => router.push("/Admin/Arrivals-Dep")}
              className="w-full h-[3rem] flex justify-center items-center gap-3
              bg-[#1f2937] rounded-xl hover:bg-sky-700 transition-all duration-300 ease-in-out cursor-pointer 
            border border-gray-400/40"
            >
              <span>
                <Users />
              </span>
              <motion.span
                animate={{ opacity: opened ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${opened ? "block" : "hidden"
                  } text-white font-bold text-xl`}
              >
                Arrivals / Departures
              </motion.span>
            </div>
          </div>
        </div>
      </motion.aside>
      <section className="h-full absolute w-[95%]  top-0 right-0">
        {children}
      </section>
    </main>
  );
};
export default LayoutAdmin;


