"use client";

import React, { useState, useEffect } from "react";
import { JwtPayload } from "jsonwebtoken";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { DropdownMenuProfile } from "@/components/costumeInputs/CostumeDropdownMenu";
import { UserCircle, MapPin, Map, ArrowBigLeftDash, HomeIcon } from "lucide-react";
import notify from "@/components/costumeInputs/Notify";
import Profile from "./Profile";
import Logout from "@/components/ServerCompoents/Logout";
import { unstable_noStore } from "next/cache";

const Gabrielaa = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LayoutProfileProps {
  children: React.ReactNode;
}

type Form = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  role: string;
};

export default function HomeProfile() {
  unstable_noStore()
  const router = useRouter();
  const [auth, setAuth] = useState<string | false | JwtPayload>(false);
  const [type, setType] = useState<string>("" as string);
  const [user, setUser] = useState<Form>({
    id: 0,
    name: "loading...",
    phone_number: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const result = await CheckAuth();
      setAuth(result);
    };

    checkAuth();
  }, [router]);
  useEffect(() => {
    if (auth) {
      console.log(user)
      setUser(auth as Form);
    } else {
      notify({ status: "error", message: "you are not logged in" });
    }
  }, [auth]);
  return (
    <main
      style={{
        backgroundImage: "url('/2.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className={`w-full h-screen lg:w-screen lg:h-screen lg:overflow-y-hidden bg-black text-gray-700 relative flex flex-col  justify-center  items-center ${Gabrielaa.className} lg:flex-row lg:items-start`}
    >
      <aside className="w-full h-full py-2 flex justify-center items-start gap-5 flex-row-reverse xl:hidden ">
        <div className="opacity-0">test</div>
        <h1 className="font-bold text-xl ">Reservations</h1>
        <DropdownMenuProfile username={user.name}>
          <Avatar className="cursor-pointer w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="capitalize">
              {
                //@ts-ignore
                user.name
                  .split(" ")
                  .map((name: any) => (name ? name[0] : "none"))
                  .join("")
              }
            </AvatarFallback>
          </Avatar>
        </DropdownMenuProfile>
      </aside>

      <aside className="hidden
      lg:absolute  left-0 lg:w-[25%] lg:h-screen lg:flex-col lg:flex bg-gray-400/20 backdrop-blur-md justify-center py-3 items-center">
        <Avatar className="cursor-pointer w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="capitalize">
            {
              //@ts-ignore
              user.name
                .split(" ")
                .map((name: any) => name[0])
                .join("")
            }
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold py-1 capitalize 
      text-[#DDF2FD]
      ">{user.name}</h1>
        <div className="flex flex-col justify-start py-5 items-center gap-5 w-full h-full">
          <SideItems
            onClick={() => setType("")}
            Icon={HomeIcon}
            title="Home"
          />
          <SideItems
            onClick={() => setType("trip")}
            Icon={MapPin}
            title="My Trips"
          />
          <SideItems
            onClick={() => setType("activity")}
            Icon={Map}
            title="My Activities"
          />
          <SideItems
            onClick={() => {

              Logout()
              window.location.href = "/";
            }}
            Icon={ArrowBigLeftDash}
            title="Logout"
          />
        </div>
      </aside>
      <section className="w-full h-full   lg:w-[75%] lg:right-0 lg:h-full lg:overflow-y-scroll lg:absolute">
        {
          user.id === 0 ? (
            <div className="animate-pulse">loading...</div>
          ) : (
            <Profile id={user.id} Type={type} />
          )
        }

      </section>
    </main>
  );
}

interface SideItemsProps {
  Icon: React.ElementType;
  title: string;
  onClick: () => void;
}
const SideItems = ({ Icon, title, onClick }: SideItemsProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[90%] h-[10%] text-white bg-gray-300/20 backdrop-blur-xl  border-1 border-gray-200/40
    hover:bg-gray-300/50 duration-500 transition-all ease-in-out
    cursor-pointer border rounded-xl flex justify-center items-center font- gap-1"
    >
      {Icon && <Icon />}
      <span className="text-gray-100">{title}</span>
    </div>
  );
};
