"use client";
interface BurgerProps {
    className?: string;
    fill?: string;
    }
  import { motion } from "framer-motion";
export default function Burger({className, fill}:BurgerProps) {
  return (
    <motion.svg
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
       

          d="M4 18L20 18"
          stroke={fill}
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
        <path
          d="M4 12L20 12"
          stroke={fill}
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
        <path
          d="M4 6L20 6"
          stroke={fill}
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
      </g>
    </motion.svg>
  );
}
