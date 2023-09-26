"use client";
import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function App() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = false;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <header ref={sliderRef} className="keen-slider h-screen ">
        <div
          style={{
            backgroundImage: "url(/bg-hero.jpg)",
          }}
          className="keen-slider__slide number-slide1 min-h-screen bg-cover bg-no-repeat bg-fixed bg-center "
        ></div>
        <div
          style={{
            backgroundImage: "url(/hero.jpeg)",
          }}
          className="keen-slider__slide number-slide2 min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
        ></div>
        <div
          style={{
            backgroundImage: "url(/bg-hero.jpg)",
          }}
          className="keen-slider__slide number-slide3 min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
        ></div>
        
      </header>
    </>
  );
}
