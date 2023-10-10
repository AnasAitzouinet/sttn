"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/costumeInputs/Inputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import notify from "../costumeInputs/Notify";
import { Toaster } from "react-hot-toast";
import { Tabs, TabsContent } from "../ui/tabs";
import { TabsList } from "../ui/tabs";
import { TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
type FormTrip = {
  email: string | any;
  phone: string;
  FullName: string;
  dateFrom: string | null;
  dateTo: string | null;
  description: string;
  language: string;
  people: number;
  userId: number;
};
interface ReservationProps {
  children: React.ReactNode;
  id?: number;
  title?: string;
  email?: string;
  phone?: string;
  FullName?: string;
}
type Trips = {
    id:number,
    title: string;
    img: string;
    price: number;
    description: string;
    city: string;
}
const GetTrips = async () => {
    const res = await fetch("https://gestionres-production.up.railway.app/Trips/", {
        method: "get",
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    };
export default function AdminRes({ children }: ReservationProps) {
  const [form, setForm] = useState<FormTrip>({
    email: "",
    phone: "",
    FullName: "",
    dateFrom: null,
    dateTo: null,
    description: "",
    language: "",
    people: 0,
    userId: 0,
  });
  const [loading, setLoading] = useState(false);
  const handleSelectChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  const [trips, setTrips] = useState<Trips[]>([]);

  useEffect(() => {
    GetTrips().then((data) => {
      setTrips(data);
    });
  }, []);





  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-gray-800/40 backdrop-blur-3xl border border-gray-300/40">
        <Tabs defaultValue="Book Now" className="w-full px-5 ">
          <Toaster />
          <TabsContent value="Book Now">
            {/* <h1 className="text-3xl text-white text-center font-bold py-3">
              Make a Reservation
            </h1> */}
            <form className="grid grid-rows-1 gap-2 w-full ">
              {loading ? (
                <div className=" h-full flex flex-col justify-center items-center">
                  <Loader
                    className="bg-transparent h-1/2 w-1/2"
                    imgClass="sm:p-0"
                  />
                </div>
              ) : (
                <>
                  <aside className=" w-full flex flex-col  gap-3">
                   
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="text-white "
                      value={form.FullName}
                      onChange={(e) =>
                        setForm({ ...form, FullName: e.target.value })
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Email"
                      className="text-white"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      className="text-white"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                     <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full rounded-xl bg-transparent border-gray-300/40">
                          <SelectValue placeholder="Trips" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {
                           trips.map((trip) => (
                            <SelectItem key={trip.id} value={trip.title}>{trip.title}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                  </aside>
                  <aside className="grid grid-rows-2 gap-2 w-full">
                    <div className=" w-full flex  gap-3">
                      <label
                        htmlFor=""
                        className="flex w-full justify-center items-center gap-2"
                      >
                        From:
                        <input
                          type="date"
                          onChange={(e) =>
                            setForm({ ...form, dateFrom: e.target.value })
                          }
                          className="w-full border border-gray-300/40 rounded-xl p-2 bg-transparent"
                        />
                      </label>
                      <label
                        htmlFor=""
                        className="flex w-full justify-center items-center gap-2"
                      >
                        to:
                        <input
                          type="date"
                          onChange={(e) =>
                            setForm({ ...form, dateTo: e.target.value })
                          }
                          className="w-full border border-gray-300/40 rounded-xl p-2 bg-transparent"
                        />
                      </label>
                    </div>
                    <div className=" w-full flex justify-center gap-3">
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full rounded-xl bg-transparent border-gray-300/40">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="number"
                        onChange={(e) =>
                          setForm({ ...form, people: parseInt(e.target.value) })
                        }
                        placeholder="Number of People"
                        className="bg-transparent rounded-xl border border-gray-300/40 p-2 w-full"
                      />
                    </div>
                  </aside>

                  <button
                    type="submit"
                    className="w-full bg-blue-700/50 backdrop-blur-xl border border-gray-300/10
              hover:bg-blue-700/70 duration-300 transition-all ease-in-out
              rounded-xl text-white py-2 font-semibold"
                  >
                    Book Now
                  </button>
                </>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}