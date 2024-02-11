"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, useSpring, animate } from "framer-motion";
import { useState } from "react";
import Input from "@/components/costumeInputs/Inputs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CheckAuth from "../ServerCompoents/CheckAuth";
import { JwtPayload } from "jsonwebtoken";
import notify from "../costumeInputs/Notify";
import { Toaster } from "react-hot-toast";
import UseSignUp from "../Auth/SignUp";
import Loader from "@/components/loader";
import { sendReservationConfirmationEmail, sendReservationEmail } from "@/lib/mail";
import prisma from "@/lib/Prisma";



interface ReservationProps {
  children: React.ReactNode;
  id?: number;
  title?: string;
  email?: string;
  phone?: string;
  FullName?: string;
  duration?: string;
  ChosenType?: string;
}

type Form = {
  email: string | any;
  phone: string;
  FullName: string;
  date: string | null;
  description: string;
  language: string;
  people: number;
  type: string;
  userId: number;
};
type FormTrip = {
  email: string | any;
  phone: string;
  FullName: string;
  datefrom: string | null;
  description: string;
  language: string;
  type: string;
  people: number;
  userId: number;
};
const Reserverations = ({
  children,
  id,
  title,
  email,
  phone,
  FullName,
  duration,
  ChosenType,
}: ReservationProps) => {
  const [form, setForm] = useState<FormTrip>({
    email: "",
    phone: "",
    FullName: "",
    datefrom: null,
    description: "",
    language: "",
    type: "",
    people: 0,
    userId: 0,
  });
  const [formError, setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    datefrom: false,
    description: false,
    people: false,
  });
  const [loading, setLoading] = useState(false); // Added state
  const [LoggedIn, setLoggedIn] = useState(false);

  const [type, setType] = useState("shuttle"); // Added state

  useEffect(() => {
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
  }, []); // Removed dependencies

  const handleSelectChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { FullName, email, phone, description, datefrom, people, language } =
      form;

    if (
      !(
        FullName &&
        email &&
        phone &&
        phone.length >= 10 &&
        description &&
        datefrom &&
        people &&
        language
      )
    ) {
      setFormError({
        email: !email,
        phone: !phone,
        FullName: !FullName,
        description: !description,
        datefrom: !datefrom,
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

    const dateObj = new Date(datefrom);
    const now = new Date();
    const SevenDays = new Date();
    const twoDays = new Date();
    SevenDays.setDate(now.getDate() + 7);
    twoDays.setDate(now.getDate() + 2);

    if (dateObj < now) {
      setFormError({ ...formError, datefrom: true });
      notify({ message: "Dates can't be before today", status: "error" });
      return false;
    }
    if (duration === "3days") {
      if (dateObj < twoDays) {
        setFormError({ ...formError, datefrom: true });
        notify({
          message: "Date from can't be less than 48h from now",
          status: "error",
        });
        return false;
      }
    } else {
      if (dateObj < SevenDays) {
        setFormError({ ...formError, datefrom: true });
        notify({
          message: "Date from can't be less than 7 days from now",
          status: "error",
        });
        return false;
      }
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
      type: ChosenType,
      trip: { id },
      details: description,
      dateFrom: datefrom,
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

    switch (LoggedIn) {
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
            await sendReservationConfirmationEmail(
              {
                title: title,
                email: form.email,
                FullName: form.FullName,
                phone: form.phone,
                dateFrom: form.datefrom,
                type: form.type,
                people: form.people,
                language: form.language,
                description: form.description,
              },
              form.email,
            );
            setInterval(async () => {
              await sendReservationEmail(
                {
                  title: title,
                  email: form.email,
                  FullName: form.FullName,
                  phone: form.phone,
                  dateFrom: form.datefrom,
                  type: form.type,
                  people: form.people,
                  language: form.language,
                  description: form.description,
                },
                form.email,
                "trip"
              ), 1000
            });
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
          await sendReservationConfirmationEmail(
            {
              title: title,
              email: form.email,
              FullName: form.FullName,
              phone: form.phone,
              dateFrom: form.datefrom,
              type: form.type,
              people: form.people,
              language: form.language,
              description: form.description,
            },
            form.email,
          );
          setInterval(async () => {
            await sendReservationEmail(
              {
                title: title,
                email: form.email,
                FullName: form.FullName,
                phone: form.phone,
                dateFrom: form.datefrom,
                type: form.type,
                people: form.people,
                language: form.language,
                description: form.description,
              },
              form.email,
              "trip"
            ), 1000
          });
          notify({ message: "Reservation created", status: "success" });
          return;
        } else {
          setLoading(false);
          notify({ message: "Something went wrong", status: "error" });
          return;
        }
    }
  };
  // console.log(form);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent backdrop-blur-3xl border border-gray-300/40">
        <Tabs defaultValue="Book Now" className="w-full px-5 ">
          <TabsList className="w-full rounded-full bg-[#0a0a0a]  border border-gray-300/30">
            <TabsTrigger className="w-full rounded-full  " value="Book Now">
              {title}
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
              <h2>Type Selected :</h2>
              <div className="flex gap-2">
                <div
                  className={`px-2 py-1 border  rounded-xl  transition-all duration-300 ease-in-out
                ${ChosenType === "shuttle"
                      ? "border-blue-700 text-blue-500"
                      : "border-gray-300/20"
                    }
                `}
                >
                  shuttle
                </div>
                <div
                  className={`px-2 py-1 border  rounded-xl  transition-all duration-300 ease-in-out
                ${ChosenType === "private"
                      ? "border-blue-700 text-blue-500"
                      : "border-gray-300/20"
                    }
                `}
                >
                  Private
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
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                    />
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
                            setForm({ ...form, datefrom: e.target.value })
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
                        value={form.people <= 0 ? "" : form.people}
                        onChange={(e) =>
                          setForm({ ...form, people: parseInt(e.target.value) })
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
};

const ReserverationsActi = ({
  children,
  id,
  title,
  email,
  phone,
  FullName,
  ChosenType,
}: ReservationProps) => {
  const [form, setForm] = useState<Form>({
    email: "",
    phone: "",
    FullName: "",
    date: null,
    description: "",
    language: "",
    type: "",
    people: 0,
    userId: 0,
  });
  const [formError, setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    date: false,
    description: false,
    people: false,
  });
  const [loading, setLoading] = useState(false); // Added state
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
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
  }, []); // Removed dependencies

  const handleSelectChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { FullName, email, phone, description, date, people, language } =
      form;

    if (
      !(
        FullName &&
        email &&
        phone &&
        phone.length >= 10 &&
        description &&
        date &&
        people &&
        language
      )
    ) {
      setFormError({
        email: !email,
        phone: !phone,
        FullName: !FullName,
        description: !description,
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

    const dateObj = new Date(date);
    const now = new Date();
    const TwoDAYS = new Date(now.setDate(now.getDate() + 2));

    if (dateObj < now) {
      setFormError({ ...formError, date: true });
      notify({ message: "Date can't be before today", status: "error" });
      return false;
    }

    if (dateObj < TwoDAYS) {
      setFormError({ ...formError, date: true });
      notify({
        message: "Date can't be less than 2 days from now",
        status: "error",
      });
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
      nbrPerson: people,
      type: ChosenType,
      language,
      activity: { id },
      details: description,
      date,
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
    switch (LoggedIn) {
      case false:
        const register = await UseSignUp({
          FullName: form.FullName,
          email: form.email,
          phone: form.phone,
        }).then((res) => {
          console.log(res);
          notify({ message: "Reservation created", status: "success" });
          return res;
        });
        if (register) {
          const latestForm = { ...newForm, userSttn: { id: register.data.id } };
          console.log(latestForm);
          const res = await fetch(
            "https://gestionres-production.up.railway.app/ResAct/",
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

            await sendReservationConfirmationEmail(
              {
                title: title,
                email: form.email,
                FullName: form.FullName,
                phone: form.phone,
                dateFrom: form.date,
                type: form.type,
                people: form.people,
                language: form.language,
                description: form.description,
              },
              form.email,
            );
            setInterval(async () => {
              await sendReservationEmail(
                {
            
                  title: title,
                  email: form.email,
                  FullName: form.FullName,
                  phone: form.phone,
                  dateFrom: form.date,
                  type: form.type,
                  people: form.people,
                  language: form.language,
                  description: form.description,
                },
                form.email,
                "activity"
              ), 1000
            });

            notify({ message: "Reservation created , check your email", status: "success" });
            return;
          }
        } else {
          setLoading(false);
          notify({ message: "Something went wrong", status: "error" });
          return;
        }
      case true:
        const res = await fetch(
          "https://gestionres-production.up.railway.app/ResAct/",
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
          
          await sendReservationConfirmationEmail(
            {
              title: title,
              email: form.email,
              FullName: form.FullName,
              phone: form.phone,
              dateFrom: form.date,
              type: form.type,
              people: form.people,
              language: form.language,
              description: form.description,
            },
            form.email,
          );
          setInterval(async () => {
            await sendReservationEmail(
              {
          
                title: title,
                email: form.email,
                FullName: form.FullName,
                phone: form.phone,
                dateFrom: form.date,
                type: form.type,
                people: form.people,
                language: form.language,
                description: form.description,
              },
              form.email,
              "activity"
            ), 1000
          });

          notify({ message: "Reservation created", status: "success" });
          return;
        } else {
          setLoading(false);
          notify({ message: "Something went wrong", status: "error" });
          return;
        }
    }
  };
  // console.log(form);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent backdrop-blur-3xl border border-gray-300/40">
        <Tabs defaultValue="Book Now" className="w-full px-5 ">
          <TabsList className="w-full rounded-full bg-[#0a0a0a]  border border-gray-300/30">
            <TabsTrigger className="w-full rounded-full  " value="Book Now">
              {title}
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
              <h2>Type Selected :</h2>
              <div className="flex gap-2">
                <div
                  className={`px-2 py-1 border  rounded-xl  transition-all duration-300 ease-in-out
                ${ChosenType === "shuttle"
                      ? "border-blue-700 text-blue-500"
                      : "border-gray-300/20"
                    }
                `}
                >
                  shuttle
                </div>
                <div
                  className={`px-2 py-1 border  rounded-xl  transition-all duration-300 ease-in-out
                ${ChosenType === "private"
                      ? "border-blue-700 text-blue-500"
                      : "border-gray-300/20"
                    }
                `}
                >
                  Private
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
                        value={form.people <= 0 ? "" : form.people}
                        onChange={(e) =>
                          setForm({ ...form, people: parseInt(e.target.value) })
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
                    cols={5}
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
};

const res = {
  Reserverations,
  ReserverationsActi,
};
export default res;
