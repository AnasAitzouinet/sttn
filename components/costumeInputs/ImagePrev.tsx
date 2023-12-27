import * as React from "react";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import res from "@/components/Reservations/Reserverations";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  images: string[];
  children: React.ReactNode;
  price: number;
  description: string;
  city?: string;
  title: string;
  id: number;
  place?: string;
  type: string;
}
export default function ImagePrev({
  images,
  id,
  children,
  price,
  description,
  city,
  title,
  type,
  place,
}: Props) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  
  return (
    <Dialog>
      <DialogTrigger
      
        onClick={() => {
          setCurrentSlide(0);
        }}
        className="text-black z-50"
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90%] flex bg-transparent backdrop-blur-2xl ">
        <div className="w-[70%] h-full overflow-hidden relative">
          <div
            ref={sliderRef}
            className="w-[70%] h-full  border  border-gray-400/20 rounded-xl overflow-hidden keen-slider"
          >
            {images.map((item, i) => (
              <img
                key={i}
                src={item}
                alt=""
                className="w-full h-full object-cover keen-slider__slide"
              />
            ))}
          </div>
          {loaded && instanceRef.current && images.length > 1 && (
            <>
              {currentSlide ===
              instanceRef?.current?.track.details.slides.length - 1 ? (
                <ChevronLeft
                  className=" w-20 h-20 absolute  cursor-pointer stroke-red-500 top-1/2 left-0 transform -translate-y-1/2"
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />
              ) : null}
              {currentSlide >= 0 ? (
                <ChevronRight
                  className=" w-20 h-20 absolute cursor-pointer stroke-red-500 top-1/2 right-0 transform -translate-y-1/2"
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              ) : null}
            </>
          )}
        </div>

        <div
          className="w-[30%] h-[95%]  m-2
      flex flex-col 
      "
        >
          <h1 className="text-3xl text-start font-bold py-2">{title}</h1>
          <h1 className="text-xl ">{price} Dh</h1>
          <div className="flex ">
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="text-yellow-300 w-4 h-4" />
          </div>
          <div className="py-2">
            <div>
              <h2 className="py-3">{city || place}</h2>
              <p>
                {description.length > 100
                  ? description.slice(0, 100) + "..."
                  : description}
              </p>
            </div>
            <div className="py-8 w-full flex items-center justify-center">
              {type === "activity" ? (
                <res.ReserverationsActi id={id} title={title}>
                  <button
                    type="submit"
                    className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
              hover:bg-gray-600/10 duration-300 transition-all ease-in-out
              rounded-xl text-white py-2 font-semibold"
                  >
                    Book Now
                  </button>
                </res.ReserverationsActi>
              ) : (
                <res.Reserverations id={id} title={title}>
                  <button
                    type="submit"
                    className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
               hover:bg-gray-600/10 duration-300 transition-all ease-in-out
               rounded-xl text-white py-2 font-semibold"
                  >
                    Book Now
                  </button>
                </res.Reserverations>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
