"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, useSpring, animate } from "framer-motion";
import { useState } from "react";
import Input from "@/components/costumeInputs/Inputs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  trigger: React.ReactNode;
}

const Testso = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center ">
        {/* <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold capitalize">
            Sign in to your <span className="text-blue-700">account</span>
          </h1>
          <span className="text-sm cursor-pointer text-gray-300 font-medium capitalize">
            need an account, create one here!
          </span>
          <Input 
            placeholder="Email"
            type="email"
            onChange={(e) => console.log(e.target.value)}
          />
        </div> */}
        <Tabs defaultValue="Sign-up" className="w-full px-5 ">
          <TabsList className="w-full rounded-full ">
            <TabsTrigger className="w-full rounded-full transition-all" value="Sign-up">Sign up</TabsTrigger>
            <TabsTrigger className="w-full rounded-full transition-all" value="Sign-in">Sign in</TabsTrigger>
          </TabsList>
          <TabsContent value="Sign-up">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="Sign-in">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Testso;
