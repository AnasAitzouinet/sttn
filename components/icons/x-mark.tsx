"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
interface xmarkProps {
  className?: string;
  fill?: string;
}
const Xmark = (xmarkProps: xmarkProps) => {
  return (
    <motion.svg
        exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className={xmarkProps.className}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </motion.svg>
  );
};

export default Xmark;
