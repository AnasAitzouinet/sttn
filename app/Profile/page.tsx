"use client";
import React, { useState, useEffect } from "react";
import { JwtPayload } from "jsonwebtoken";
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { type } from "os";
import Logout from "@/components/ServerCompoents/Logout";

type Form = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  role: string;
};

const Profile = () => {
  const [auth, setAuth] = useState<string | false | JwtPayload | undefined>(false);
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
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <ul>
        <li>user name: {user.name}</li>
        <li>user phone :{user.phone_number}</li>
        <li>user email: {user.email}</li>
      </ul>
      <button
        onClick={() => {
          Logout();
          window.location.reload();
        }}
        
      >
        sign out
      </button>
    </div>
  );
};

export default Profile;
