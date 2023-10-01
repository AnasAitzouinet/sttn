"use server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

interface CookiesProps {
  name: string;
  value: string;
  options: {
    maxAge: number;
    path: string;
  };
}
const Cookies = (CookiesProps: CookiesProps) => {
  const cookieStore = cookies();
  const value = JSON.stringify(CookiesProps.value)

  const secretKey = process.env.SECRET_KEY as string;
  const securedValue = jwt.sign(value, secretKey);

  cookieStore.set(
    CookiesProps.name, 
    securedValue, {
    maxAge: CookiesProps.options.maxAge,
    path: CookiesProps.options.path,
  });
};

export default Cookies;