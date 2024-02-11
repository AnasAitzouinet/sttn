import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "./Inputs";
import { Input as Inputs } from "../ui/input";

export type Data = {
  id: number;
  title: string;
  pictures: string[];
  priceShutlle: number;
  pricePrivate: number; 
  description: string;
  place: string;
};

import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import Upload from "./Upload";
interface Props {
  row: {
    original: Data;
  };
  Close: string | React.FC<{ children: React.ReactNode }>;
}
function TripsCol({ row, Close }: Props) {
  const [form, setForm] = useState<Data>({
    id: row.original.id,
    title: row.original.title,
    pictures: row.original.pictures,
    priceShutlle: row.original.priceShutlle,
    pricePrivate: row.original.pricePrivate,
    description: row.original.description,
    place: row.original.place,
  });
  const handelEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `https://gestionres-production.up.railway.app/Activity/${form.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) {
      console.log("updated");
    }
  };
  return (
    <form className="flex flex-col gap-2 text-gray-400" onSubmit={handelEdit}>
      <div className="flex flex-col items-start  gap-2">
        <h3>Title</h3>
        <Input
          placeholder="Title"
          type="text"
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
          className="text-gray-100"
          value={form.title}
        />
      </div>
      <div className="flex flex-col items-start  gap-2">
        <h3>Price</h3>
        <Input
          placeholder={`Price `}
          type="text"
          onChange={(e) => {
            setForm({ ...form, priceShutlle: parseInt(e.target.value) });
          }}
          value={form.priceShutlle.toString()}
          className="text-gray-100"
        />
        <Input
          placeholder={`Price `}
          type="text"
          onChange={(e) => {
            setForm({ ...form, pricePrivate: parseInt(e.target.value) });
          }}
          value={form.pricePrivate.toString()}
          className="text-gray-100"
        />
      </div>
      <div className="flex flex-col items-start  gap-2">
        <h3>Place</h3>
        <Input
          placeholder="Place"
          type="text"
          onChange={(e) => {
            setForm({ ...form, place: e.target.value });
          }}
          value={form.place}
          className="text-gray-100"
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
      <Close>
        <button
          type="submit"
          className="w-full py-2 text-white bg-sky-700 border border-gray-400/40 rounded-full"
        >
          Edit
        </button>
      </Close>
    </form>
  );
}

const UpdateImage = ({ row }: Props) => {
  const [image, setImage] = useState<File>();
  const [urls, setUrl] = useState<string[]>(row.original.pictures);
  const [imgUrl, setImgUrl] = useState<string>("");
  const handelImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const uploadImage = async () => {
    if (!image) {
      console.error("No image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_upload_preset"); // replace with your upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/df2j87kme/image/upload",
      {
        // replace with your cloud name
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse.url;
    } else {
      console.error("Upload failed");
    }
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = await uploadImage()
    if (!image) return;
    setImgUrl(image);
    const res = await fetch(
      `https://gestionres-production.up.railway.app/Activity/${row.original.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...row.original,
          img: image,
        }),
      }
    );
    if (res.ok) {
      console.log("updated");
    } else {
      console.log(res);
    }
  };
  return (
    <form onSubmit={handelSubmit} className="">
      {/* <Upload onChange={handelImage} /> */}
      <div className="flex flex-col gap-2 ">
        <h1>Image Uploaded :</h1>
        <div className="flex gap-2 px-3">
          {
            urls.map((url) => (
              <img
                key={url}
                src={url}
                alt=""
                className="w-24 h-24 border-2 border-gray-150
                hover:border-blue-700 hover:border-2 duration-300 transition-all ease-in-out
                rounded-xl"
              />
            ))
          }
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Add new images :</p>
        <Inputs type="file" onChange={handelImage} />
        <button
          type="submit"
          className="bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          Update
        </button>
      </div>
    </form>
  );
};

const DeleteTrip = async (id: number) => {
  const res = await fetch(
    `https://gestionres-production.up.railway.app/Activity/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    console.log("deleted");
  } else {
    console.log(res);
  }
};
export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priceShutlle",
    header: "price Shuttle",
  },
  {
    accessorKey: "pricePrivate",
    header: "price Private",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "place",
    header: "Place",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      const trip = row.original;
      return (
        <div className="flex justify-center items-center">
          <img
            src={trip.pictures[0]}
            alt={trip.title}
            className="w-20 h-20 rounded-xl "
          />
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Dialog>
          <DialogTrigger>
            <Button className="h-8 w-8 p-2 bg-transparent text-black">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Info</DialogTitle>
            </DialogHeader>
            <TripsCol row={row} Close={DialogClose} />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "Update",
    header: "Update",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>
            <Button className="h-8 w-8 p-2 bg-transparent text-black">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:bg-transparent"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Info</DialogTitle>
              <UpdateImage row={row} Close={DialogClose} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure ? </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col text-gray-400">
              <p>you will delete this reservation </p>
              <div className="flex justify-end">
                <DialogClose>
                  <button
                    onClick={() => DeleteTrip(row.original.id)}
                    className="bg-red-700 px-5 py-2 text-white rounded-xl hover:bg-red-600"
                  >
                    Delete
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
