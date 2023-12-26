"use client";

import Input from "@/components/costumeInputs/Inputs";
import React from "react";
import { useParams, redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import CheckCookie from "@/components/ServerCompoents/CheckCookie";
import Cookies from "@/components/ServerCompoents/Cookies";

const checkToken = ({ tokens }: { tokens: string }) => {
  if (!tokens) {
    redirect("/");
  }
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;
  if (secretKey === undefined) throw new Error("SECRET_KEY is undefined");
  try {
    const decodedToken = jwt.verify(tokens, secretKey);
    return decodedToken;
  } catch (err: any) {
    console.log(err.message); // This will log the error message, which should be 'jwt expired' if the token is expired.
    redirect("/");
  }
};

export default function PWD() {
  const { token } = useParams();
  const [ids , setId]= React.useState<string>('');
  React.useEffect(() => {
    const cookieExpired = checkToken({ tokens: token as string });
    const { id } = cookieExpired as JwtPayload;
    setId(id);
  }, [token]);

  React.useEffect(() => {
    const ChangePwd = async () => {
      const res = await fetch("/api/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ids }),
      });
      const data = await res.json();
      console.log(data);
    };
    ChangePwd();
  }, [ids]);

  return (
    <div className="w-screen h-screen flex relative justify-center items-center">
      <div className="bg-gray-900 border shadow-lg shadow-sky-950 w-[70%] h-[60%] flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl py-2 font-bold">
          Create your Password
        </h1>
        <p className="text-center text-lg leading-2 text-gray-300">
          you can access your account using your email and this password
        </p>
        <span>this link is </span>

        <form className="py-5 flex flex-col gap-5 w-[70%] sm:w-[40%] ">
          <Input
            type="password"
            onChange={() => console.log()}
            className="text-white"
            placeholder="password"
          />
          <Input
            type="password"
            onChange={() => console.log()}
            className="text-white"
            placeholder="Confirm password"
          />
          <button className="bg-blue-500 text-white py-2 rounded-md">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
