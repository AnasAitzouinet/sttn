"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

 const CheckCookie = () => {
    const cookiesStore = cookies();
    const user = cookiesStore.get("Pwd");
    if (!user) return false;
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;
    const decoded = jwt.verify(user.value, secretKey);
    if (decoded) {
        console.log(decoded);
      return decoded;
    } else {
      console.log("error 155");
      return false;
    }
  }
  export default CheckCookie;