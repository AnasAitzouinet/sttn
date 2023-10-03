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
interface ReservationProps {
  children: React.ReactNode;
  id: number;
  title: string;
  email?: string;
  phone?: string;
  FullName?: string;
}

type Form = {
  email: string | any;
  phone: string;
  FullName: string;
  date: string | null;
  description: string;
  language: string;
  people: number;
  userId: number;
};
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
const Reserverations = ({
  children,
  id,
  title,
  email,
  phone,
  FullName,
}: ReservationProps) => {
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
  const [formError, setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    dateFrom: false,
    dateTo: false,
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
    const {
      FullName,
      email,
      phone,
      description,
      dateFrom,
      dateTo,
      people,
      language,
    } = form;
    if (
      FullName.length &&
      email.length &&
      phone.length &&
      phone.length >= 10 &&
      description.length &&
      dateFrom &&
      dateTo &&
      people &&
      language
    ) {
      if (!EmailRegex.test(email)) {
        setFormError({ ...formError, email: true });
        notify({ message: "Email is not valid", status: "error" });
        return false;
      }
      const newForm = {
        email,
        phone: phone,
        numberOfPersons: people,
        language,
        trip: {
          id,
        },
        details: description,
        dateFrom,
        dateTo,
        userSttn: {
          id: form.userId,
        },
      };
      console.log(newForm);
      return newForm;
    } else {
      setFormError({
        email: !email.length,
        phone: !phone.length,
        FullName: !FullName.length,
        description: !form.description.length,
        dateFrom: !form.dateFrom,
        dateTo: !form.dateTo,
        people: !form.people,
      });
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }
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
                  <textarea
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    cols={5}
                    rows={5}
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
}: ReservationProps) => {
  const [form, setForm] = useState<Form>({
    email: "",
    phone: "",
    FullName: "",
    date: null,
    description: "",
    language: "",
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
      FullName.length &&
      email.length &&
      phone.length &&
      phone.length >= 10 &&
      description.length &&
      date &&
      people &&
      language
    ) {
      if (!EmailRegex.test(email)) {
        setFormError({ ...formError, email: true });
        notify({ message: "Email is not valid", status: "error" });
        return false;
      }
      const newForm = {
        email,
        phone: phone,
        nbrPerson: people,
        language,
        activity: {
          id,
        },
        details: description,
        date,
        userSttn: {
          id: form.userId,
        },
      };
      console.log(newForm);
      return newForm;
    } else {
      setFormError({
        email: !email.length,
        phone: !phone.length,
        FullName: !FullName.length,
        description: !form.description.length,
        date: !form.date,
        people: !form.people,
      });
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }
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
                    rows={5}
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
