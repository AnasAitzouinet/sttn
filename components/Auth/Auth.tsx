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

const SignIn = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <h1 className="text-2xl font-bold capitalize">
        Welcom Back our {""}
        <span className="text-blue-700">Traveler</span>
      </h1>
      <span className="text-sm  text-gray-300 font-medium capitalize">
        Sign in to your account
      </span>
      <form className="h-full w-full flex gap-5 flex-col justify-center items-center py-5">
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => console.log(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => console.log(e.target.value)}
        />
        <button className="bg-blue-900 hover:bg-blue-700 transition-all duration-500 text-white w-full py-2 rounded-full">
          Sign in
        </button>
      </form>
    </div>
  );
};
const SignUp = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <h1 className="text-2xl font-bold capitalize">
        First time here, {""}
        <span className="text-blue-700">Traveler?</span>
      </h1>
      <span className="text-sm  text-gray-300 font-medium capitalize">
        create an account
      </span>
      <form className="h-full w-full flex gap-5 flex-col justify-center items-center py-5">
        <Input
          placeholder="Full Name"
          type="text"
          onChange={(e) => console.log(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => console.log(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => console.log(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => console.log(e.target.value)}
        />

        <button className="bg-blue-900 hover:bg-blue-700 transition-all duration-500 text-white w-full py-2 rounded-full">
          Sign in
        </button>
      </form>
    </div>
  );
};
const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center ">
        <Tabs defaultValue="Sign-up" className="w-full px-5 ">
          <TabsList className="w-full rounded-full ">
            <TabsTrigger
              className="w-full rounded-full transition-all"
              value="Sign-up"
            >
              Sign up
            </TabsTrigger>
            <TabsTrigger
              className="w-full rounded-full transition-all"
              value="Sign-in"
            >
              Sign in
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Sign-up">
            <SignUp />
          </TabsContent>
          <TabsContent value="Sign-in">
            <SignIn />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
