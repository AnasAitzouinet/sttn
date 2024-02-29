"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import notify from "../costumeInputs/Notify";
import { Toaster } from "react-hot-toast";
import UseSignUp from "../Auth/SignUp";
import Loader from "@/components/loader";
import Input from "@/components/costumeInputs/Inputs";
import CheckAuth from "../ServerCompoents/CheckAuth";

interface Props {
  children: React.ReactNode;
  id?: number;
  email?: string;
  phone?: string;
  FullName?: string;
  type?: string;
}
type Form = {
  email: string | any;
  phone: string;
  FullName: string;
  date: string | null;
  description: string;
  types: string;
  place: string;
  statue: string;
  userId: number;
};

export default function ReserverationD({
  children,
  id,
  email,
  phone,
  FullName,
  type,
}: Props) {
  const [form, setForm] = React.useState<Form>({
    email: "",
    phone: "",
    FullName: "",
    date: "",
    description: "",
    types: "",
    place: "",
    statue: "",
    userId: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [types, setTypes] = React.useState("departure");
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    const Auth = async () => {
      const res = await CheckAuth();
      if (res && typeof res !== "string") {
        setLoggedIn(true);
        return setForm((prevForm) => ({
          ...prevForm,
          email: res.email,
          phone: res.phone_number,
          FullName: res.name,
          userId: res.id,
        }));
      }
    };
    Auth();
  }, []);

  const [formError, setFormError] = React.useState({
    email: false,
    phone: false,
    FullName: false,
    description: false,
    date: false,
    statue: false,
    place: false,
  });
  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { FullName, email, phone, description, date, types, place, statue } =
      form;

    if (
      !(
        FullName &&
        email &&
        phone &&
        phone.length >= 10 &&
        description &&
        date &&
        types &&
        place &&
        statue
      )
    ) {
      setFormError({
        email: !email,
        phone: !phone,
        FullName: !FullName,
        description: !description,
        date: !date,
        statue: !statue,
        place: !place,
      });
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }

    if (!EmailRegex.test(email)) {
      setFormError({ ...formError, email: true });
      notify({ message: "Email is not valid", status: "error" });
      return false;
    }

    const dates = new Date(date);
    const now = new Date();
    const SevenDays = new Date();
    SevenDays.setDate(now.getDate() + 7);

    if (dates < now) {
      setFormError({ ...formError, date: true });
      notify({ message: "Date is not valid", status: "error" });
      return false;
    }

    const newForm = {
      email,
      phone,
      statue,
      description,
      date,
      types,
      place,
    };

    console.log(newForm);

    return newForm;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = handleError();
    if (!newForm) return;
    setLoading(true);
    switch (loggedIn) {
      case false:
        const register = await UseSignUp({
          FullName: form.FullName,
          email: form.email,
          phone: form.phone,
        });
        if (register) {
          const latestForm = { ...newForm, userSttn: { id: register.data.id } };
          console.log(latestForm);
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
      case true:
        const res = await fetch(
          "https://gestionres-production.up.railway.app/ResTrip/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newForm),
          }
        );
        if (res.ok) {
          setLoading(false);
          notify({ message: "Reservation created", status: "success" });
          return;
        } else {
          setLoading(false);
          notify({ message: "Something went wrong", status: "error" });
          return;
        }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent backdrop-blur-3xl border border-gray-300/40">
        <Tabs defaultValue="Book Now" className="w-full px-5 ">
          <TabsList className="w-full rounded-full bg-[#0a0a0a]  border border-gray-300/30">
            <TabsTrigger className="w-full rounded-full  " value="Book Now">
              {types}
            </TabsTrigger>
          </TabsList>
          <Toaster />
          <TabsContent value="Book Now">
            <h1 className="text-3xl text-white text-center font-bold py-3">
              Make a Reservation
            </h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-rows-1 gap-2 w-full "
            >
              <h2>
                Select type <span className="text-red-500">*</span> :
              </h2>
              <div className="flex gap-2">
                <div
                  className={`px-2 py-1 border  rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  type === "arrival"
                    ? "border-blue-700 text-blue-500"
                    : "border-gray-300/20"
                }
                `}
                >
                  Arrival
                </div>
                <div
                  className={`px-2 py-1 border  rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  type === "departure"
                    ? "border-blue-700 text-blue-500 "
                    : "border-gray-300/20"
                }
                `}
                >
                  Departure
                </div>
              </div>
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
                      className="text-white"
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
                    <Input
                      type="text"
                      placeholder="Place"
                      className="text-white"
                      value={form.place}
                      onChange={(e) =>
                        setForm({ ...form, place: e.target.value })
                      }
                    />
                  </aside>
                  <aside className="grid grid-rows-2 gap-2 w-full">
                    <div className=" w-full flex  gap-3">
                      <label
                        htmlFor=""
                        className="flex w-full justify-center items-center gap-2"
                      >
                        Date
                      
                        <input
                          type="datetime-local"
                          onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                          }
                          className="w-full border border-gray-300/40 rounded-xl p-2 bg-transparent"
                        />
                      </label>
                    </div>
                    <div className=" w-full flex justify-center gap-3">
                      <input
                        type="text"
                        onChange={(e) =>
                          setForm({ ...form, statue: e.target.value })
                        }
                        placeholder="Number of People"
                        className="bg-transparent rounded-xl border border-gray-300/40 p-2 w-full"
                      />
                    </div>
                  </aside>
                  <textarea
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    cols={4}
                    rows={3}
                    placeholder="Message"
                    className="w-full border border-gray-300/40 rounded-xl p-2 bg-transparent
              
              "
                  />
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
