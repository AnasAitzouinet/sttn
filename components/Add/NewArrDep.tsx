"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useCallback } from "react";
import Input from "../costumeInputs/Inputs";
import Upload from "../costumeInputs/Upload";
import { DialogClose } from "@radix-ui/react-dialog";
import notify from "../costumeInputs/Notify";
import { Input as Inputs } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
interface Props {
  children: React.ReactNode;
}
type Form = {
  type: string;
  description: string;
  date: string;
  email: string;
  phone: string;
  place: string;
  status: string;
};

export default function NewArrDep({ children }: Props) {
   const [form, setForm] = useState<Form>({
    type: "",
    description: "",
    date: "",
    email: "",
    phone: "",
    place: "",
    status: "",
  });



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.type === "" ||
      form.date === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.place === "" ||
      form.status === ""
    )
    {
      return;
    }
    try {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/ResArrivalDeparture/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setForm({
          type: "",
          description: "",
          date: "",
          email: "",
          phone: "",
          place: "",
          status: "",
        });
        notify({ status: "success", message: "Trip Added Successfully" });
      } else {
        const errorResponse = await res.json();

        notify({ status: "error", message: errorResponse.message });
      }
    } catch (error) {
      notify({ status: "error", message: "Failed to add " + form.type });
      console.error("Failed to add " + form.type , error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <Toaster />
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-200 text-md font-semibold">
            type
          </label>
          <select className="bg-transparent" onChange={(e)=> setForm({...form , type: e.target.value})}>
            <option className="bg-transparent" value="ARRIVAL">Arrival</option>
            <option className="bg-transparent" value="DEPARTURE">Departure</option>
          </select>
          <label className="text-gray-200 text-md font-semibold">
            email
          </label>
          <Input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="email"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            phone
          </label>
          <Input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            type="tel"
            placeholder="phone"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            place
          </label>
          <Input
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            type="text"
            placeholder="place"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            status
          </label>
          <Input
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            type="text"
            placeholder="status"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            description
          </label>
          <textarea
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="description"
            className="border text-white  bg-transparent border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />

          <label className="text-gray-200 text-md font-semibold">
            date
          </label>
          <Input
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            type="date"
            placeholder="date"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <DialogClose asChild
           >
            <button
 
              className="bg-blue-600 text-white w-full py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="submit"
            >
             Add
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
