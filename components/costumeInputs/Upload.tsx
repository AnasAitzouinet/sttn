"use client";

import React from "react";
import { motion, useSpring } from "framer-motion";
interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}
export default function Upload({ onChange }: Props) {
  const [isHover, setHover] = React.useState(false);
  return (
    <motion.label
      initial={{ width: "14%", height: "50%" }}
      whileTap={{ scale: 0.9 }} // scale animation
      animate={{ width: isHover ? "25%" : "14%", height: "50%" }}
      transition={{ type: "spring", duration: 1 }} // spring animation
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      htmlFor="file-upload"
      className="border border-gray-100 rounded-full py-3 flex justify-center items-center  cursor-pointer"
    >
      <motion.svg
        transition={{ type: "spring", duration: 1.5 }} // spring animation
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
        />
      </motion.svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHover ? 1 : 0 }}
        transition={{ type: "spring", duration: 1.5 }} // spring animation
        className={isHover ? " text-center font-semibold" : "hidden"}
      >
        Upload
      </motion.span>
      <input id="file-upload" multiple type="file" className="hidden" onChange={onChange} />
    </motion.label>
  );
}
