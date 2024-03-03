"use server"
import { cookies } from "next/headers";

const Logout = () => {
  const cookiesStore = cookies();
  cookiesStore.set("token",'')
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
  return true;
};

export default Logout;