"use client";
import React, { use, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Testso = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const Header = useRef(null);
  const isInViewHeader = useInView(Header, { once: true });

  return (
    <main className="h-full w-full backdrop-blur-2xl">
      <h1
      ref={Header}
      style={{
        opacity: isInViewHeader ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
        className="text-[2.7rem] indent-2 leading-10 text-gray-700 font-bold text-left
      py-8
      px-5 shadow-xl shadow-white "
      >
        We Travel Not to Escape Life {""}
        <span className="text-sky-500 ">But for Life not to Escape Us</span>
      </h1>
      <section className="flex flex-col  h-full gap-8 px-5  mx-5 py-5">
        <div
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="grid grid-cols-2 gap-2"
        >
          <img src="/ee.jpg" alt="ee" className="h-[70vh] w-full object-cover rounded-xl" />
          <div>
            <span className=" text-blue-500  font-medium text-left ">
              Who are we? {""}
            </span>
            <h1 className="text-3xl capitalize font-bold py-2">
              Nejmdine tourism
            </h1>
            <p className="text-bold text-lg">
              In this post, we are going to highlight the many benefits of
              blogging for business ...
            </p>
          </div>
        </div>
        <div
          ref={ref1}
          style={{
            transform: isInView1 ? "none" : "translateX(-200px)",
            opacity: isInView1 ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="grid grid-cols-2 gap-2 "
        >
          <div>
            <span className=" text-sky-900  font-medium text-left ">
              Who are we? {""}
            </span>
            <h1 className="text-3xl capitalize font-bold py-2">
              Nejmdine tourism
            </h1>
            <p className="text-bold text-lg">
              In this post, we are going to highlight the many benefits of
              blogging for business ...
            </p>
          </div>
          <img
            src="/ee.jpg"
            alt="ee"
            className="h-[60vh] w-full object-cover rounded-xl border-sky-400/40 border"
          />
        </div>
        <div
          ref={ref2}
          style={{
            transform: isInView2 ? "none" : "translateX(-200px)",
            opacity: isInView2 ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="grid grid-cols-2 gap-2"
        >
          <img
            src="/ee.jpg"
            alt="ee"
            className="h-[50vh] w-full object-cover rounded-xl"
          />
          <div>
            <span className=" text-blue-900  font-medium text-left ">
              Who are we? {""}
            </span>
            <h1 className="text-3xl capitalize font-bold py-2">
              Nejmdine tourism
            </h1>
            <p className="text-bold text-lg">
              In this post, we are going to highlight the many benefits of
              blogging for business ...
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testso;
