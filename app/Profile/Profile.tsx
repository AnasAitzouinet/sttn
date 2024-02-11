"use client";
import ReservationCards from "@/components/costumeInputs/ReservationCards";
import { unstable_noStore } from "next/cache";
import React, { useState, useEffect, useCallback } from "react";

interface ProfileProps {
  id: number;
  Type?: string;
}
export type TripData = {
  id: number;
  trip: {
    id: number;
    title: string;
    pictures: string[];
    priceShuttle: number;
    pricePrivate: number;
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
  created_at: string;
  userSttn: {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
  };
};
export type ActivityData = {
  id: number;
  activity: {
    id: number;
    title: string;
    pictures: string[];
    priceShutlle: number;
    pricePrivate: number;
    description: string;
    place: string;
  };
  date: string;
  nbrPerson: string;
  language: string;
  type: string;
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
  paymentIntentId: string;
  created_at: string;
};

const getReservations = async (id: number) => {
  const res = await fetch(
    `https://gestionres-production.up.railway.app/api/users/${id}/reservationsTrip`
  );
  const data = await res.json();
  if (!res.ok) {
    return { error: data };
  }
  return data;
};
const getReservationsActivity = async (id: number) => {
  const res = await fetch(
    `https://gestionres-production.up.railway.app/api/users/${id}/reservationsActi`
  );
  // ts-ignore
  const data = await res.json();
  if (!res.ok) {
    return { error: data };
  }
  return data;
};
export default function Profile({ id, Type }: ProfileProps) {
  unstable_noStore();
  const [reservationsT, setReservationsT] = useState<TripData[]>([]);
  const [reservationsA, setReservationsA] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservationsTrip = useCallback(async () => {
    const res = await getReservations(id);
    console.log(res);
    setReservationsT(res);
    setLoading(false);
  }, [id]);

  const fetchReservationsActivity = useCallback(async () => {
    const res = await getReservationsActivity(id);
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res);
    setReservationsA(res);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchReservationsTrip();
    fetchReservationsActivity();
  }, [fetchReservationsTrip, fetchReservationsActivity]);

  return (
    <section className="w-full h-full  text-gray-700">
      {/* <div className="border lg:border-none"></div> */}
      <div
        className="flex flex-col justify-start items-center gap-3 px-8 w-full  md:grid md:grid-cols-2 md:px-5 text-white lg:grid-cols-3"
      >
        {loading ? (
          <div className="animate-pulse">loading...</div>
        ) : reservationsT.length === 0 ? (
          <div className="text-center">no reservations yet</div>
        ) : Type === "" ? (
          <>
            {reservationsT.map((reservation) => (
              <ReservationCards
                key={reservation.id}
                img={reservation.trip.pictures[0]}
                title={reservation.trip.title}
                type={"reservationsTrip"}
                date={reservation.created_at}
                status={reservation.statue}
                data={reservation}
              />
            ))}
            {reservationsA.map((reservation) => (
              <ReservationCards
                key={reservation.id}
                img={reservation.activity.pictures[0]}
                title={reservation.activity.title}
                type={"Activity"}
                date={reservation.created_at}
                status={reservation.statue}
                data={reservation}
              />
            ))}
          </>
        ) : Type === "trip" ? (
          reservationsT.map((reservation) => (
            <ReservationCards
              key={reservation.id}
              img={reservation.trip.pictures[0]}
              title={reservation.trip.title}
              type={"reservationsTrip"}
              date={reservation.created_at}
              status={reservation.statue}
              data={reservation}
            />
          ))
        ) : (
          reservationsA.map((reservation) => (
            <ReservationCards
              key={reservation.id}
              img={reservation.activity.pictures[0]}
              title={reservation.activity.title}
              type={"Activity"}
              date={reservation.created_at}
              status={reservation.statue}
              data={reservation}
            />
          ))
        )}
      </div>
    </section>
  );
}
