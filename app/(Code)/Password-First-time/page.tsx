"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/Card/CardWrapper";
import { Button } from "@/components/ui/button";
import { passwordUpdater } from "@/actions/password";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import notify from "@/components/costumeInputs/Notify";

export default function PWD() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const onSubmits = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordUpdater(token as string, password).then((res) => {
      if (res && res.success) {
        notify({ status: "succes", message: "Password updated" });
        router.push('/')
      } else {
        notify({ status: "error", message: "Password not updated" });
      }
    });
  }
      

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1C1C1C]">
      <CardWrapper
        header="Reset Password"
        description="Enter your new password"
        className="rounded-xl"
        Socials={false}
        href="/"
        footer="Back to homepage"
      >
        <Toaster />
        <form onSubmit={onSubmits} className="flex flex-col items-center space-y-4">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="pass">New Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="border-2 border-[#1C1C1C] rounded-xl bg-transparent text-white"
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              variant={"link"}
              className="text-sm text-start w-full"
            >
              show password
            </Button>
          </div>

          <Button type="submit" className="w-3/4 rounded-xl">
            Save Password
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
}
