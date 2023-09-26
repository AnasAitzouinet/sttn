"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const Navbar = () => {
  const router = usePathname();
  const [checked, setChecked] = useState(true);

  return (
    <nav
      className="absolute z-20 w-screen h-16 flex  item-center 
     justify-between px-2 sm:justify-around
    "
    >
      <h1 className="py-3  text-center text-white font-bold text-xl">Navbar</h1>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="bg-transparent sm:hidden">
            <UseAnimations
              onClick={() => setChecked(!checked)}
              animation={menu2}
              size={50}
              strokeColor="white"
            />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link prefetch={false} href={"/"}>
                Gallery
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
            <Link prefetch={false} href={"/Destinations"}>
                Destinations
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <ul className="text-gray-300 font-semibold hidden  sm:flex gap-5 justify-start items-center">
        <li className={`${router === "/" ? "text-white" : ""} `}>
          <a href="/">Gallery</a>
        </li>      
        <li className={`${router === "/Destinations" ? "text-white" : ""} `}>
          <a href="/Destinations">Destinations</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
