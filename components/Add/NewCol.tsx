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
import Upload from "../costumeInputs/Upload";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input as Inputs } from "@/components/ui/input";
interface Props {
  children: React.ReactNode;
}
type Form = {
  title: string;
  pictures: string[];
  price: number;
  description: string;
  place: string;
};
export default function NewCol({ children }: Props) {
  const [images, setImages] = React.useState<File[]>([]);
  const [form, setForm] = React.useState<Form>({
    title: "",
    description: "",
    price: 0,
    place: "",
    pictures: [],
  });
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_upload_preset");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/df2j87kme/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.url;
    } else {
      console.error("Upload failed");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urls = await Promise.all(images.map(uploadImage));
    const validUrls = urls.filter(Boolean); // Remove any null values (failed uploads)
    if (validUrls.length === 0) return;
    try {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/Activity/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            pictures: validUrls,
          }),
        }
      );
      if (res.ok) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-200 text-md font-semibold">
            Activity Name
          </label>
          <Input
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            placeholder="Trip Name"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Price
          </label>
          <Input
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            type="number"
            placeholder="Trip Price"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Place
          </label>
          <Input
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            type="text"
            placeholder="Trip City"
            className="border text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Description
          </label>
          <textarea
            placeholder="Trip Description"
            rows={2}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border bg-transparent border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold flex flex-col items-start justify-start gap-2 ">
            <span className="">Activity Image :</span>
            <Inputs type="file" onChange={handleImages} multiple />
          </label>
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
