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
import notify from "../costumeInputs/Notify";
import { Input as Inputs } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
interface Props {
  children: React.ReactNode;
}
type Form = {
  title: string;
  pictures: string[];
  price: number;
  description: string;
  city: string;
};

export default function NewTrip({ children }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    price: 0,
    city: "",
    pictures: [],
  });

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const uploadImages = async (images: File[]) => {
    const uploadPromises = images.map(async (image) => {
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
    });

    return Promise.all(uploadPromises);
  };

  React.useEffect(() => {
    if (images.length > 0) {
      uploadImages(images).then((urls) => {
        const filteredUrls = urls.filter((url) => url !== null) as string[];
        setForm((prevForm : any) => ({
          ...prevForm,
          pictures: [...prevForm.pictures, ...filteredUrls],
        }));
      });
    }
  }, [images]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.title === "" ||
      form.description === "" ||
      form.city === "" ||
      form.price === 0 ||
      form.pictures.length === 0
    ) {
      return;
    }
    try {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/Trips/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        notify({ status: "success", message: "Trip Added Successfully" });
      } else {
        const errorResponse = await res.json();
        notify({ status: "error", message: errorResponse.message });
      }
    } catch (error) {
      notify({ status: "error", message: "Failed to add trip" });
      console.error("Failed to add trip", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <Toaster />
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-200 text-md font-semibold">
            Trip Name
          </label>
          <Input
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            placeholder="Trip Name"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Trip Price
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
            Trip City
          </label>
          <Input
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            type="text"
            placeholder="Trip City"
            className="border text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Trip Description
          </label>
          <textarea
            placeholder="Trip Description"
            rows={2}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border bg-transparent border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold flex flex-col items-start justify-start gap-2 ">
            <span className="">Trip Image :</span>
            <Inputs
              title="upload"
              type="file"
              multiple
              onChange={handleImages}
            />
            {/* <Upload onChange={handleImages} /> */}
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
