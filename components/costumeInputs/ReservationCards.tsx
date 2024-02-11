import React, { useCallback, useEffect , useState} from "react";
import { Info } from "lucide-react";
import { ActivityData, TripData } from "@/app/Profile/Profile";
import OrderPrev from "./OrderPrev";
import { ConfirmationPrice } from "@/actions/stripe";

interface ReservationCardsProps {
  img: string;
  title: string;
  type: string;
  date: string;
  status: "ACCEPTED" | "PENDING" | "NOT_ACCEPTED";
  data: TripData | ActivityData;
}
export default function ReservationCards({
  img,
  title,
  type,
  date,
  status,
  data,
}: ReservationCardsProps) {
  const [stripeLink, setStripeLink] = useState("");
  const onClickGenerateLink = async () => {
    const stripeLink = await ConfirmationPrice({
      email: data.userSttn.email,
      productName: (data as TripData).trip?.title || (data as ActivityData).activity?.title,
      description: (data as TripData).trip?.description || (data as ActivityData).activity?.description,
      price: ((data as TripData).trip?.priceShuttle || ((data as TripData).trip?.priceShuttle)) || ((data as ActivityData).activity?.priceShutlle || (data as ActivityData).activity?.pricePrivate),
      userId: data.userSttn.id,
      resID: data.id,
      img: img,
    })
    if (stripeLink.success) {
      console.log(stripeLink.url)
      setStripeLink(stripeLink.url!);
    }
  }

  useEffect(() => {
    if(status === "ACCEPTED"){
      onClickGenerateLink();
    }
  }, [status])
  return (
    <OrderPrev
      id={data.id}
      images={(data as TripData).trip?.pictures || (data as ActivityData).activity?.pictures}
      title={title}
      type={type}
      // date={date}
      status={status}
      link={stripeLink}
    >
      <div className="min-h-[10rem] sm:min-h-[17rem] w-full relative cursor-pointer overflow-hidden rounded-xl  border border-gray-300/40">
        <div
          className="absolute bottom-0 left-0 w-full h-full z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.9) 150%)",
          }}></div>
        <div
          className="absolute bottom-0 left-0 w-full h-full z-10"
          style={{
            background:
              "linear-gradient(360deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.9) 150%)",
          }}></div>
        <img
          src={img}
          className="object-cover min-h-[10rem] sm:min-h-[17rem] absolute z-0 w-full duration-500 transition-all ease-in-out"
          alt=""
        />
        <span
          className="font-semibold absolute top-2 right-3 z-10  text-white flex justify-center items-center gap-1">
          <div
            className={`w-2 h-2 z-10 rounded-full bg-green-500 animate-pulse `}
          ></div>
          {type === "reservationsTrip" ? "Trip" : "Activity"}
        </span>
        <span
          className={`font-semibold absolute top-2 left-3 z-10 
      ${status == "ACCEPTED" ? "text-green-500 " : ""}
      ${status == "PENDING" ? "text-orange-500 " : ""}
      ${status == "NOT_ACCEPTED" ? "text-red-500 " : ""}
      `}
        >
          <span className="text-gray-200">Status :</span>{" "}
          {status == "ACCEPTED"
            ? "Accepted"
            : status == "PENDING"
              ? "Pending"
              : status == "NOT_ACCEPTED"
                ? "Not Accepted"
                : ""}
        </span>
        <span className="font-semibold absolute top-8 text-gray-300 text-sm left-3 z-30 ">
          {date}
        </span>
        <div className="w-full z-50 absolute flex bottom-0 justify-center items-center flex-col py-2">
          <h1 className="font-semibold text-2xl  text-white">
            {title}
          </h1>
        </div>
      </div>
    </OrderPrev>
  );
}
