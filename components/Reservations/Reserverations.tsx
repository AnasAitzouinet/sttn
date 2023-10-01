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
import { set } from "date-fns";
import { parse } from "path";
interface ReservationProps {
  children: React.ReactNode;
  id: number;
  title: string;
  email?: string;
  phone?: string;
  FullName?: string;
}

type Form = {
  email: string;
  phone: string;
  FullName: string;
  dateFrom: string | null;
  dateTo: string | null;
  description: string;
  language: string;
  people: number;
};
const Reserverations = ({
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
    dateFrom: null,
    dateTo: null,
    description: "",
    language: "",
    people: 0,
  });

  const [formError , setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    dateFrom: false,
    dateTo: false,
    description: false,
    people: false,
  })


  const handleSelectChange = (value: string) => {
    setForm({ ...form, language: value });
  };


  console.log(form);
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
          <TabsContent value="Book Now">
            <h1 className="text-3xl text-white text-center font-bold py-3">
              Make a Reservation
            </h1>
            <main className="grid grid-rows-1 gap-2 w-full ">
              <aside className=" w-full flex flex-col  gap-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="text-white"
                  onChange={(e) =>
                    setForm({ ...form, FullName: e.target.value })
                  }
                />
                <Input
                  type="text"
                  placeholder="Email"
                  className="text-white"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  className="text-white"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                    onChange={(e) => setForm({ ...form, people: parseInt(e.target.value) })}
                    placeholder="Number of People"
                    className="bg-transparent rounded-xl border border-gray-300/40 p-2 w-full"
                  />
                </div>
              </aside>
              <textarea
               onChange={(e) => setForm({ ...form, description: e.target.value })}
                cols={5}
                rows={5}
                placeholder="Message"
                className="w-full border border-gray-300/40 rounded-xl p-2 bg-transparent
              
              "
              />
              <button
                className="w-full bg-blue-700/50 backdrop-blur-xl border border-gray-300/10
              hover:bg-blue-700/70 duration-300 transition-all ease-in-out
              rounded-xl text-white py-2 font-semibold"
              >
                Book Now
              </button>
            </main>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Reserverations;
