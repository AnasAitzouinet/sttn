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

export type Data = {
  id: number;
  activity: {
    id: number;
    title: string;
    img: string;
    price: number;
    description: string;
    place: string;
  };
  date: string;
  nbrPerson: string;
  language: string;
  email: string;
  phone: string;
  details: string;
  statue: string;
  userSttn: {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
  };
};

export type JsonData = Data[];

const ChangeStatue = async ({ id, statue }: { id: number; statue: string }) => {
  const res = await fetch(
    `https://gestionres-production.up.railway.app/ResAct/${id}/updateStatue`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statue),
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "statue",
    header: "Statue",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.statue === "ACCEPTED" ? (
            <span className="bg-green-600 text-white py-1 px-2 rounded-full">Accepted</span>
          ) : row.original.statue === "NOT_ACCEPTED" ? (
            <span className="bg-red-600 text-white py-1 px-2 rounded-full">Denied</span>
          ) : (
            <span className="bg-yellow-600 text-white py-1 px-2 rounded-full">Pending</span>
          )}
        </span>
        )
    },
  },
  {
    accessorKey: "activity.title",
    header: "activity",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "date F",
    cell: ({ row }) => {
      return (
        <span className="">
          {new Date(row.original.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
 
  {
    accessorKey: "nbrPerson",
    header: "Nombre de personne",
  },
  {
    accessorKey: "userSttn.name",
    header: "User ",
    cell: ({ row }) => {
      const user = row.original.userSttn;

      return (
        <Dialog>
          <DialogTrigger>
            <button className="">
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User informations: </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col text-gray-400">
              <p>
                Full name: <span className="text-gray-100">{user.name}</span>
              </p>
              <p>
                Phone number:{" "}
                <span className="text-gray-100">{user.phone_number}</span>
              </p>
              <p>
                Email: <span className="text-gray-100">{user.email}</span>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dialog>
          <DialogTrigger>
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Details: </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col text-gray-400">
              <p>
                Full name:{" "}
                <span className="text-gray-100">{data.userSttn.name}</span>
              </p>
              <p>
                Phone number:{" "}
                <span className="text-gray-100">
                  {data.userSttn.phone_number}
                </span>
              </p>
              <p>
                Email: <span className="text-gray-100">{data.email}</span>
              </p>
              <p>
                Language: <span className="text-gray-100">{data.language}</span>
              </p>
              <p>
                Date:{" "}
                <span className="text-gray-100">
                  {new Date(data.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
      
              <p>
                Number of persons:{" "}
                <span className="text-gray-100">{data.nbrPerson}</span>
              </p>
              <p>
              activity: <span className="text-gray-100">{data.activity.title}</span>
              </p>
              <p>
                place: <span className="text-gray-100 ">{data.activity.place}</span>
              </p>
              <p>
                Price: <span className="text-gray-100">{data.activity.price}</span>
              </p>
              <p>
                Description:{" "}
                <span className="text-gray-100">{data.activity.description}</span>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-xl space-y-1 bg-gray-400/40 backdrop-blur-xl border border-gray-400/40"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => {
                ChangeStatue({ id: payment.id, statue: "ACCEPTED" });
              }}
              className="bg-green-900 text-white rounded-xl hover:bg-green-400"
            >
              Accepter
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                ChangeStatue({ id: payment.id, statue: "NOT_ACCEPTED" });
              }}
              className="bg-orange-700 text-white rounded-xl hover:bg-orange-400"
            >
              Denied
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                <button className="bg-red-700 px-5 py-2 text-white rounded-xl hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
