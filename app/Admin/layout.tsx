"use client";

import React from "react";
import { motion } from "framer-motion";

interface layoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: layoutProps) => {
  return (
    <main className="relative">
      <motion.aside
      initial={{ width:"8%" }}
      whileHover={{ width:"20%" }}
      className="bg-sky-500 h-full w-1/5 fixed top-0 left-0 z-50"
      >hello</motion.aside>
      {children}
    </main>
  );
};
export default layout;
