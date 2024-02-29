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
  subject: string;
  email: string;
  phone: string;
  description: string;
};

export default function NewContacts({ children }: Props) {
  const [form, setForm] = useState<Form>({
    subject: "",
    email: "",
    phone: "",
    description: "",
  });



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.subject === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.description === ""

    ) {
      return;
    }
    try {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/contacts",
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
          subject: "",
          email: "",
          phone: "",
          description: "",
        });
        notify({ status: "success", message: "Contact Added Successfully" });
      } else {
        const errorResponse = await res.json();

        notify({ status: "error", message: errorResponse.message });
      }
    } catch (error) {
      notify({ status: "error", message: "Failed to add " });
      console.error("Failed to add ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <Toaster />
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col items-start  gap-2">
            <h3>Subject</h3>
            <Input
              placeholder="Subject"
              type="text"
              onChange={(e) => {
                setForm({ ...form, subject: e.target.value });
              }}
              className="text-gray-100"
              value={form.subject}
            />
          </div>
          <div className="flex flex-col items-start  gap-2">
            <h3>Email</h3>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              className="text-gray-100"
              value={form.email}
            />
          </div>
          <div className="flex flex-col items-start  gap-2">
            <h3>Phone</h3>
            <Input
              placeholder="Phone"
              type="tel"
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
              }}
              className="text-gray-100"
              value={form.phone}
            />
          </div>
          <div className="flex flex-col items-start  gap-2">
            <h3>Description</h3>
            <textarea
              placeholder="Description"
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
              }}
              value={form.description}
              className="text-gray-100 bg-transparent rounded-xl w-full h-20"
            />
          </div>

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
