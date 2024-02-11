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
import notify from "../costumeInputs/Notify";
interface Props {
  children: React.ReactNode;
}
type Form = {
  title: string;
  pictures: string[];
  priceShutlle: number;
  pricePrivate: number;
  description: string;
  place: string;
};
export default function NewCol({ children }: Props) {
  const [images, setImages] = React.useState<File[]>([]);
  const [valid, setValid] = React.useState<boolean>(false);

  const [form, setForm] = React.useState<Form>({
    title: "",
    description: "",
    priceShutlle: 0,
    pricePrivate: 0, 
    place: "",
    pictures: [],
  });
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const uploadImages = React.useCallback(async () => {
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
          console.log(form);

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
      form.place === "" ||
      form.pricePrivate === 0 ||
      form.priceShutlle === 0 ||
      form.pictures.length === 0 ||
      valid === false
    ) {
      return;
    }
    console.log(form);

    try {
      const res = await fetch(
        "https://gestionres-production.up.railway.app/Activity/",
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
          priceShutlle: 0,
          pricePrivate: 0, place: "",
          pictures: [],
        });
        setValid(false);
        setImages([]);
        notify({ status: "success", message: "Activity Added Successfully" });
      } else {
        const errorResponse = await res.json();

        notify({ status: "error", message: errorResponse.message });
      }
    } catch (error) {
      notify({ status: "error", message: "Failed to add Activity" });
      console.error("Failed to add Activity", error);
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
            placeholder="Activity Name"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Price Shuttle
          </label>
          <Input
            onChange={(e) =>
              setForm({ ...form, priceShutlle: Number(e.target.value) })
            }
            type="text"
            placeholder="Activity Price Shuttle"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Price Private
          </label>
          <Input
            onChange={(e) =>
              setForm({ ...form, pricePrivate: Number(e.target.value) })
            }
            type="number"
            placeholder="Activity Price Private"
            className="border text-white  border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Place
          </label>
          <Input
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            type="text"
            placeholder="Activity City"
            className="border text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold">
            Activity Description
          </label>
          <textarea
            placeholder="Activity Description"
            rows={2}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border bg-transparent border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <label className="text-gray-200 text-md font-semibold flex flex-col items-start justify-start gap-2 ">
            <span className="">Activity Image :</span>
            <Inputs type="file" onChange={handleImages} multiple />
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
