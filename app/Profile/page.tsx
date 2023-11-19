"use client";
import React, { useState, useEffect } from "react";
import { JwtPayload } from "jsonwebtoken";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import SearchBar from "@/components/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenuProfile } from "@/components/costumeInputs/CostumeDropdownMenu";
import { UserCircle, MapPin, Map } from "lucide-react";
import notify from "@/components/costumeInputs/Notify";
import Profile from "./Home";
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
export default function LayoutProfile({ children }: LayoutProfileProps) {
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
      setUser(auth as Form);
    } else {
      notify({ status: "error", message: "you are not logged in" });
    }
  }, [auth]);
  return (
    <main
      className={`w-full h-full lg:w-screen lg:h-screen lg:overflow-y-hidden bg-sky-300/40 backdrop-blur-xl  text-gray-700 relative flex flex-col justify-center items-center ${Gabrielaa.className} lg:flex-row lg:items-start`}
    >
      <aside className="w-full h-full py-2 flex justify-around items-center gap-5 flex-row-reverse xl:hidden ">
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

      <aside className="hidden lg:absolute  left-0 lg:w-[25%] lg:h-screen lg:flex-col lg:flex bg-sky-400/40 backdrop-blur-xl justify-center py-3 items-center">
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
        <h1 className="font-bold py-1 capitalize">{user.name}</h1>
        <div className="flex flex-col justify-start py-5 items-center gap-5 w-full h-full">
          <SideItems
            onClick={() => console.log("1")}
            Icon={UserCircle}
            title="Profile"
          />
          <SideItems
            onClick={() => console.log("1")}
            Icon={MapPin}
            title="My Trips"
          />
          <SideItems
            onClick={() => console.log("1")}
            Icon={Map}
            title="My Activities"
          />
        </div>
      </aside>
      <section className="w-full h-full lg:w-[75%] lg:right-0 lg:h-full lg:overflow-y-scroll lg:absolute">
        <Profile id={user.id} Type="Trip"/>
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
      className="w-[90%] h-[10%] bg-sky-200 border-1 border-gray-200
    hover:bg-sky-100 duration-500 transition-all ease-in-out
    cursor-pointer border rounded-xl flex justify-center items-center font-bold gap-1"
    >
      {Icon && <Icon />}
      <span className="text-gray-700">{title}</span>
    </div>
  );
};
