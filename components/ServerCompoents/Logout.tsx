"use server"
import { cookies } from "next/headers";

const Logout = () => {
  const cookiesStore = cookies();
  cookiesStore.delete("token")
  return true;
};

export default Logout;