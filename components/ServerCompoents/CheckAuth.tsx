"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const CheckAuth = () => {
  const cookiesStore = cookies();
  const user = cookiesStore.get("token");
  if (!user) return false;
  const secretKey = process.env.SECRET_KEY as string;
  const decoded = jwt.verify(user.value, secretKey);
  if (decoded) {
    return decoded;
  } else {
    return false;
  }
};

export default CheckAuth;
