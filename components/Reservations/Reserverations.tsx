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
interface ReservationProps {
  children: React.ReactNode;
  id: number;
  title: string;
  email?: string;
  phone?: string;
  FullName?: string;
}
const Reserverations = ({
  children,
  id,
  title,
  email,
  phone,
  FullName,
}: ReservationProps) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent backdrop-blur-3xl">
        <Tabs defaultValue="Book Now" className="w-full px-5 bg-transparent">
          <TabsList className="w-full rounded-full ">
            <TabsTrigger className="w-full rounded-full  " value="Book Now">
              {title}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Book Now">
            <h1 className="text-3xl text-white text-center font-bold py-3">
              Make a Reservation
            </h1>
            <main className="grid grid-rows-1 gap-2 w-full">
              <aside className=" w-full flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => console.log(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => console.log(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => console.log(e.target.value)}
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
                      name=""
                      id=""
                      className="w-full border border-gray-300 rounded-xl p-2 bg-transparent"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex w-full justify-center items-center gap-2"
                  >
                    to:
                    <input
                      type="date"
                      name=""
                      id=""
                      className="w-full border border-gray-300 rounded-xl p-2 bg-transparent"
                    />
                  </label>
                </div>
                <div className=" w-full flex justify-center gap-3">
                  <Select>
                    <SelectTrigger className="w-full rounded-xl bg-transparent border-gray-400">
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
                    name=""
                    placeholder="Number of People"
                    className="bg-transparent rounded-xl border border-gray-300 p-2 w-full"
                  />
                </div>
              </aside>
              <textarea
                name=""
                id=""
                cols={5}
                rows={5}
                placeholder="Message"
                className="w-full border border-gray-300 rounded-xl p-2 bg-transparent
              
              "
              />
              <button
                className="w-full bg-blue-700/50 backdrop-blur-xl
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
