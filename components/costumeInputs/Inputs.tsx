"use client";
import { motion, useSpring, animate } from "framer-motion";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (Props: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.input
      animate={{ borderRadius: isFocus ? 50 : 10 }} // animate prop for animation
      transition={{ type: "spring", duration: 0.8 }} // spring animation
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      type={Props.type}
      placeholder={Props.placeholder}
      onChange={Props.onChange}
      className="bg-red-800 w-full focus:outline-none
        border-gray-400
        focus:border-blue-900 bg-transparent"
    />
  );
};
export default Input;
