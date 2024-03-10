"use client";
import { motion, useSpring, animate } from "framer-motion";
import { useState } from "react";
// @ts-ignore
import { twMerge } from "tailwind-merge"
interface InputProps {
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  diasbled?: boolean;
}
const Input = (Props: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);  

  return (
    <motion.input
      value={Props.value}
      animate={{ borderRadius: isFocus ? 50 : 10 }} // animate prop for animation
      transition={{ type: "spring", duration: 0.8 }} // spring animation
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      type={Props.type}
      disabled={Props.diasbled}
      placeholder={Props.placeholder}
      onChange={Props.onChange}
      className={twMerge(
        `w-full border border-gray-400  text-black bg-transparent rounded-full focus:outline-none focus:ring-0 focus:border-blue-400`,
        Props.className
      )}
    />
  );
};





export default Input;
