"use server"
import { cookies } from "next/headers";

const Logout = () => {
  const cookiesStore = cookies();
  cookiesStore.delete("token")
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
  return true;
};

export default Logout;