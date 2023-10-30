"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import Input from "../costumeInputs/Inputs";
import { DialogClose } from "@radix-ui/react-dialog";
interface Props {
  children: React.ReactNode;
}
type Form = {
  name: string;
  phone_number: string;
  email: string;
  password: string;
};
export default function NewUser({ children }: Props) {
  const [form, setForm] = React.useState<Form>({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  // console.log(form);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       await fetch(
        "https://gestionres-production.up.railway.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            phone_number: form.phone_number,
            email: form.email,
            password: form.password,
            role: "CLIENT",
          }),
        }
      ).then((res) => {
        if (res.ok) {
          alert("user added");
        } else {
          alert("something went wrong");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-200 text-md font-semibold">Name</label>
          <Input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            placeholder="user Name"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">email</label>
          <Input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="text"
            placeholder="Trip Price"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            phone Number
          </label>
          <Input
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            type="text"
            placeholder="phone number"
            className="border text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">Password</label>
          <Input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="text"
            placeholder="Password"
            className="border text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <DialogClose>
            <button
              className="bg-blue-600 text-white w-full py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="submit"
            >
              save
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
