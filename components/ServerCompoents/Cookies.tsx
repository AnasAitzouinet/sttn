"use server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { setCookie } from "nookies";

interface CookiesProps {
  name: string;
  value: string;
  options: {
    maxAge: number;
    path: string;
  };
}

const Cookies = async (CookiesProps: CookiesProps) => {
  try {
    const cookieStore = cookies();
    const value = JSON.stringify(CookiesProps.value);

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not set');
    }
    console.log(CookiesProps)
    const securedValue = jwt.sign(value, secretKey);

    cookieStore.set(
      CookiesProps.name,
      securedValue, {
      maxAge: CookiesProps.options.maxAge,
      path: CookiesProps.options.path,
      secure: true,
      sameSite: 'strict',
      httpOnly: true
    }
    );


  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Cookies;
