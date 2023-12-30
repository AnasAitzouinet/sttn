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
import UseSignUp from "../Auth/SignUp";
type FormActi = {
    email: string | any;
    phone: string;
    FullName: string;
    date: string | null;
    description: string;
    language: string;
    people: number;
    type: string;
    userId: number;
    activitieID: number;
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
    id: number;
    title: string;
    pictures: string[];
    price: number;
    description: string;
    place: string;
};
const GetTrips = async () => {
  const res = await fetch(
    "https://gestionres-production.up.railway.app/Activity/",
    {
      method: "get",
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};
export default function ActivitieRes({ children }: ReservationProps) {
  const [form, setForm] = useState<FormActi>({
    email: "",
    phone: "",
    FullName: "",
    date: null,
    description: "",
    language: "",
    type: "",
    activitieID: 0,
    people: 0,
    userId: 0,
  });
  const [formError, setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    date: false,
    people: false,
  });
  const [loading, setLoading] = useState(false);
  console.log(form, formError);

  const [types, setTypes] = useState("Shuttle");
 
 const handleSelectChange = (value: string) => {
   setForm({ ...form, language: value });
  };
  const handleSelectChangeTrip = (value: string) => {
    const newValue = parseInt(value);
    setForm({ ...form, activitieID: newValue });
  };
  
  const [trips, setTrips] = useState<Trips[]>([]);


  useEffect(() => {
    GetTrips().then((data) => {
      setTrips(data);
    });
  }, []);

  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { FullName, email, phone, date, people, language } = form;

    if (
      !(
        FullName &&
        email &&
        phone &&
        phone.length >= 10 &&
        date &&
        people &&
        language
      )
    ) {
      setFormError({
        email: !email,
        phone: !phone,
        FullName: !FullName,
        date: !date,
        people: !people,
      });
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }

    if (!EmailRegex.test(email)) {
      setFormError({ ...formError, email: true });
      notify({ message: "Email is not valid", status: "error" });
      return false;
    }

    const dateFromObj = new Date(date);
    const now = new Date();

    if (dateFromObj < now ) {
      setFormError({ ...formError, date: true });
      notify({ message: "Dates can't be before today", status: "error" });
      return false;
    }

   

    if (people < 1) {
      setFormError({ ...formError, people: true });
      notify({
        message: "Number of people can't be less than 1",
        status: "error",
      });
      return false;
    }

    const newForm = {
      email,
      phone,
      numberOfPersons: people,
      language,
      activity: { id: form.activitieID },
      date,
      types,
      userSttn: { id: form.userId },
    };
    console.log(newForm);
    return newForm;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = handleError();
    if (!newForm) return;
    setLoading(true);

    const register = await UseSignUp({
      FullName: form.FullName,
      email: form.email,
      phone: form.phone,
    });
    if (register) {
      const latestForm = { ...newForm, userSttn: { id: register.data.id } };
      const res = await fetch(
        "https://gestionres-production.up.railway.app/ResTrip/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(latestForm),
        }
      );
      if (res.ok) {
        setLoading(false);
        notify({ message: "Reservation created", status: "success" });
        return;
      }
    } else {
      setLoading(false);
      notify({ message: "Something went wrong", status: "error" });
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-gray-800/40 backdrop-blur-3xl border border-gray-300/40">
        <Tabs defaultValue="Book Now" className="w-full px-5 ">
          <Toaster />
          <TabsContent value="Book Now">
            <form
              className="grid grid-rows-1 gap-2 w-full "
              onSubmit={handleSubmit}
            >
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
                  <div className="flex gap-2">
                <div
                  onClick={() => setTypes("Shuttle")}
                  className={`px-2 py-1 border  rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  types === "Shuttle"
                    ? "border-blue-700 text-blue-500"
                    : "border-gray-300/20"
                }
                `}
                >
                  Shuttle
                </div>
                <div
                  onClick={() => setTypes("Private")}
                  className={`px-2 py-1 border  rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  types === "Private"
                    ? "border-blue-700 text-blue-500 "
                    : "border-gray-300/20"
                }
                `}
                >
                  Private
                </div>
              </div>
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
                    <Select onValueChange={handleSelectChangeTrip}>
                      <SelectTrigger className="w-full rounded-xl bg-transparent border-gray-300/40">
                        <SelectValue placeholder="Activities" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {trips.map((trip) => (
                          <SelectItem className="rounded-xl" key={trip.id} value={trip.id.toString()}>
                            {trip.title}
                          </SelectItem>
                        ))}
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
                            setForm({ ...form, date: e.target.value })
                          }
                          
                          className="w-full border   border-gray-300/40 rounded-xl p-2 bg-transparent"
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
