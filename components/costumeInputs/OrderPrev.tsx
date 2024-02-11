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
import { Button } from "../ui/button";

interface Props {
    images: string[];
    children: React.ReactNode;
    status: "ACCEPTED" | "PENDING" | "NOT_ACCEPTED";
    city?: string;
    title: string;
    id: number;
    place?: string;
    type: string;
    link: string;
}
export default function OrderPrev({
    images,
    id,
    children,
    status,
    city,
    title,
    place,
    link
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
                    <div className="py-2">
                        <div>
                            <h2 className="py-3">{city || place}</h2>

                        </div>
                        <div className="py-8 w-full  flex items-center justify-center">
                            {
                                status == "ACCEPTED" ? (
                                    <button
                                        onClick={() => {
                                            window.open(link, "_blank");
                                        }
                                        }
                                        className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-green-500/10
                  hover:bg-gray-600/10 duration-300 transition-all ease-in-out
                  rounded-xl text-green-500 py-2 font-semibold"
                                    >
                                        Confirm Reservation
                                    </button>) : status == "PENDING" ? (
                                        <Button
                                        disabled
                                            type="submit"
                                            className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-orange-500/10
                    hover:bg-gray-600/10 duration-300 transition-all ease-in-out
                    rounded-xl text-orange-500 py-2 font-semibold"
                                        >
                                            Waiting for confirmation
                                        </Button>
                                    )

                                    : (
                                        <Button
                                            disabled
                                            type="submit"
                                            className="w-full px-8 bg-gray-600/40 backdrop-blur-xl border border-red-400/10
                    hover:bg-gray-600/10 duration-300 transition-all ease-in-out
                    rounded-xl text-red-400 py-2 font-semibold"
                                        >
                                            Reservation is Full
                                        </Button>

                                    )
                            }

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
