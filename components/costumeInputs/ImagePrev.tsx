import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import res from "@/components/Reservations/Reserverations";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  images: string[];
  children: React.ReactNode;
  priceShuttle: number;
  pricePrivate: number;
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
  pricePrivate,
  priceShuttle,
  description,
  city,
  title,
  type,
  place,
}: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger className="text-black z-50">{children}</DialogTrigger>
      <DialogContent className="lg:max-w-6xl max-w-[90%] md:h-[90%] lg:h-auto rounded-xl  flex flex-col-reverse lg:flex-row  items-center justify-center bg-transparent backdrop-blur-2xl ">
        <Carousel className="h-[60%] w-full lg:w-[70%] lg:h-full overflow-hidden  rounded-xl border border-gray-400/20">
          <CarouselContent>
            {images.map((item, i) => (
              <CarouselItem key={i} className="">
                <AspectRatio ratio={16 / 9}>
                  <img src={item} alt="" className="object-cover  rounded-xl" />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-10 h-10 absolute text-white   top-1/2 left-5 " />
          <CarouselNext className="w-10 h-10 absolute  top-1/2 right-5 " />
        </Carousel>

        <div
          className="lg:w-[30%] lg:h-[95%]  m-2 flex flex-col 
      "
        >
          <h1 className="text-3xl text-start font-bold py-2">{title}</h1>
          <h1 className="text-xl "><span className="text-emerald-500">{priceShuttle}500 Dh</span>  - Shuttle</h1>
          <h1 className="text-xl ">price Private :{pricePrivate} Dh</h1>
          {/* <div className="flex ">
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="fill-yellow-300 text-yellow-300 w-4 h-4" />
            <Star className="text-yellow-300 w-4 h-4" />
          </div> */}
          <div className="py-2">
            <div>
              <h2 className="py-3">{city || place}</h2>
              <p className="overflow-auto">
                {open ? description : description.slice(0, 100) + " ..."}
                <span
                  onClick={() => setOpen(!open)}
                  className="text-xs font-bold text-sky-400 cursor-pointer"
                >
                  {open ? " Read Less" : " Read More"}
                </span>
              </p>
            </div>
            <div className="py-8 w-full  flex items-center justify-center">
              {type === "activity" ? (
                <div className="flex gap-5">
                  <res.ReserverationsActi
                    id={id}
                    title={title}
                    ChosenType="shuttle"
                  >
                    <button
                      type="submit"
                      className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
              hover:bg-gray-600/10 duration-300 transition-all ease-in-out
              rounded-xl text-white py-2 font-semibold"
                    >
                      Shuttle
                    </button>
                  </res.ReserverationsActi>
                  <res.ReserverationsActi
                    id={id}
                    title={title}
                    ChosenType="private"
                  >
                    <button
                      type="submit"
                      className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
            hover:bg-gray-600/10 duration-300 transition-all ease-in-out
            rounded-xl text-white py-2 font-semibold"
                    >
                      Private
                    </button>
                  </res.ReserverationsActi>
                </div>
              ) : (
                <div className="flex gap-5">
                  <res.Reserverations
                    id={id}
                    title={title}
                    ChosenType="shuttle"
                  >
                    <button
                      type="submit"
                      className="w-[100%] px-8  bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
               hover:bg-gray-600/10 duration-300 transition-all ease-in-out
               rounded-xl text-white py-2 font-semibold"
                    >
                      shuttle
                    </button>
                  </res.Reserverations>
                  <res.Reserverations
                    id={id}
                    title={title}
                    ChosenType="private"
                  >
                    <button
                      type="submit"
                      className="w-[100%] px-8  bg-gray-600/40 backdrop-blur-xl border border-gray-300/10
              hover:bg-gray-600/10 duration-300 transition-all ease-in-out
              rounded-xl text-white py-2 font-semibold"
                    >
                      Private
                    </button>
                  </res.Reserverations>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
