import ReservationCards from "@/components/costumeInputs/ReservationCards";
import React, { useState, useEffect } from "react";

interface ProfileProps {
  id: number;
  Type?: string;
}
type TripData = {
  id: number;
  trip: {
    id: number;
    title: string;
    img: string;
    price: number;
    description: string;
    city: string;
  };
  dateFrom: string;
  dateTo: string;
  numberOfPersons: string;
  language: string;
  email: string;
  phone: string;
  details: string;
  statue: "ACCEPTED" | "PENDING" | "NOT_ACCEPTED";
  userSttn: {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
  };
};

const getReservations = async (id: number, Type: string) => {
  const res = await fetch(
    `https://gestionres-production.up.railway.app/api/users/${id}/${Type}`
  );
  const data = await res.json();
  if (!res.ok) {
    return { error: data };
  }
  return data;
};
export default function Profile({ id, Type }: ProfileProps) {
  const [reservations, setReservations] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("");
  console.log(type);
  useEffect(() => {
    const fetchReservations = async () => {
      if (Type == "Trip") {
        setType("reservationsTrip");
      } else if (Type == "Activity") {
        setType("reservationsActi");
      }
      const reservations = await getReservations(id, type);
      if (reservations.error) {
        console.log(reservations.error);
        console.log(reservations);
        setLoading(false);
        return;
      }
      setReservations(reservations);
      setLoading(false);
    };
    fetchReservations();
  }, [id, type, Type]);
  return (
    <section className="w-full h-full text-gray-700">
      <div className="border lg:border-none"></div>
      <div
        className="flex flex-col justify-center items-center gap-3 py-8 md:grid md:grid-cols-2 md:px-5 
        lg:grid-cols-3"
      >
        {loading ? (
          <div className="animate-pulse">loading...</div>
        ) : reservations.length === 0 ? (
          <div className="text-center">no reservations yet</div>
        ) : (
          reservations.map((reservation) => (
            <ReservationCards
              key={reservation.id}
              img={reservation.trip.img}
              title={reservation.trip.title}
              type={type}
              // date={reservation.date}
              status={reservation.statue}
              details={reservation.details}
            />
          ))
        )}
      </div>
    </section>
  );
}
