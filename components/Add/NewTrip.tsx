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
  title: string;
  pictures: string[];
  priceShuttle: number;
  pricePrivate: number; description: string;
  city: string;
};

export default function NewTrip({ children }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [valid, setValid] = useState<boolean>(false);
   const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    priceShuttle: 0,
    pricePrivate: 0,
    city: "",
    pictures: [],
  });

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const uploadImages = useCallback(async () => {
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
    const urls = await Promise.all(uploadPromises);
    return urls;
  }, [images]);

  React.useEffect(() => {
    const imgs = uploadImages();
    if (imgs) {
      imgs.then((urls) => {
        if (urls.length === 0) {
          setValid(false);
          return;
        } else {
          setValid(true);
          setForm({ ...form, pictures: urls });
          console.log(urls);
        }
      });
    }
  }, [images]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.title === "" ||
      form.description === "" ||
      form.city === "" ||
      form.pricePrivate === 0 ||
      form.priceShuttle === 0 ||
      form.pictures.length === 0 ||
      valid === false
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
        setForm({
          title: "",
          description: "",
          priceShuttle: 0,
          pricePrivate: 0,
          city: "",
          pictures: [],
        });
        setValid(false);
        setImages([]);
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
            Trip Price Shuttle
          </label>
          <Input
            onChange={(e) =>
              setForm({ ...form, priceShuttle: Number(e.target.value) })
            }
            type="number"
            placeholder="Trip Price Shuttle"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Trip Price Private
          </label>
          <Input
            onChange={(e) =>
              setForm({ ...form, pricePrivate: Number(e.target.value) })
            }
            type="number"
            placeholder="Trip Price Private"
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
          <DialogClose asChild
            disabled={valid === false ? true : false}
          >
            <button
              disabled={valid === false ? true : false}

              className="bg-blue-600 text-white w-full py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="submit"
            >
              {
                valid === false ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5  text-white text-center w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Add"
                )
              }
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
