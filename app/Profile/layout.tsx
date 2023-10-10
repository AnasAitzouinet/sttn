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
  const [user, setUser] = useState<Form>({
    id: 0,
    name: "",
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
  }, []);

  useEffect(() => {
    if (auth) {
      setUser(auth as Form);
    }
  }, [auth]);
  return (
    <main
      className={`w-screen h-screen bg-cover bg-no-repeat bg-center  overflow-hidden  ${Gabrielaa.className} `}
      style={{
        backgroundImage: "url('/profile.jpg')",
      }}
    >
      <nav
        className="w-screen flex flex-row items-center 
      backdrop-blur-2xl 
      justify-around gap-1  py-2 text-white font-extralight"
      >
        <ul className="text-white flex items-center gap-5 font-extralight">
          <NavLink name="Home" paths="/" />
          <NavLink name="Destinations" paths="/Destinations" />
          <NavLink name="Who we are ?" paths="/Who-we-are" />
          <NavLink name="Contact us" paths="Contact-us" />
        </ul>
        <div className="flex gap-3 justify-center items-center">
          <Avatar
            onClick={() => router.push("/Profile")}
            className="cursor-pointer"
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="capitalize">
              {user.name
                .split(" ")
                .map((name: string) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-1/3
      w-full flex flex-col justify-center items-center px-5 leading-[4rem]"
      >
        <nav className="text-[4rem] font-medium capitalize">
          Welcome {user.name},
        </nav>
        <div className="leading-7 flex flex-col text-center text-zinc-200">
          <span className="text-[1.3rem]  px-2 font-medium capitalize">
            Email: {user.email}
          </span>
          <span className="text-[1.3rem]  px-2 font-medium capitalize">
            Phone: {user.phone_number}
          </span>
        </div>
      </motion.aside>
      <section className=" h-2/3 p-5">
      <Tabs defaultValue="account" className="w-full h-full border rounded-xl border-gray-400/40 p-2 bg-transparent backdrop-blur-xl  ">
        <TabsList className="w-full bg-transparent text-white">
          <TabsTrigger value="account" className="w-full rounded-full data-[state=active]:bg-black/70 data-[state=active]:backdrop-blur-2xl">Reservation Trips</TabsTrigger>
          <TabsTrigger value="passwords"  className="w-full rounded-full data-[state=active]:bg-black/70 data-[state=active]:backdrop-blur-2xl ">Reservation Password</TabsTrigger>
          <TabsTrigger value="password"  className="w-full rounded-full data-[state=active]:bg-black/70 data-[state=active]:backdrop-blur-2xl">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="border">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      </section>
    </main>
  );
}
