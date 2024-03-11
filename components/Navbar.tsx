"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
interface TestsoProps {
  children: React.ReactNode;
}
import { Crimson_Pro, Poppins } from "next/font/google";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "@/components/Auth/Auth";
const NavLink = ({ name, paths }: { name: string; paths?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const path = usePathname();
  let pathName = path.split("/")[1];
  path === '/' ? pathName = 'Home' : pathName
  return (
    <motion.li
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
            ${
              name === "Account"
                ? "border border-gray-400/40 bg-sky-200/20  text-center  text-white hover:bg-sky-400/10 transition-all duration-500 ease-in-out backdrop-blur-sm px-5 py-2 rounded-full"
                : ""
            }
        `}
    >
      <a href={paths}>{name}</a>
      <motion.div
        className="border-b border-white"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5 }}
        animate={{ width:  pathName === name  ? "100%" : isHovered ? "100%" : 0 }}
      ></motion.div>
    </motion.li>
  );
};


export default NavLink;
