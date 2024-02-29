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
  try {
    const cookieStore = cookies();
    const value = JSON.stringify(CookiesProps.value);

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not set');
    }

    const securedValue = jwt.sign(value, secretKey);

    cookieStore.set(
      CookiesProps.name,
      securedValue, {
      maxAge: CookiesProps.options.maxAge,
      path: CookiesProps.options.path,
      secure: true,
      sameSite: 'none',
      httpOnly: true
    }
    );

    console.log('cookie set');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Cookies;
