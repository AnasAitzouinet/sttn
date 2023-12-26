import { NextRequest, NextResponse } from "next/server";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY as string);
import jwt from "jsonwebtoken";
import Cookies from "@/components/ServerCompoents/Cookies";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
export async function POST(req: NextRequest) {
  const body = await req.json(); // or req.json() if you're expecting a JSON body
  const { id, email, name } = body;
  const code = `STTN-${randomUUID()}-pdw`;

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;
  const token = jwt.sign({ id, email, code}, secretKey,{expiresIn: "600s"});
  const link = `http://localhost:3000/Password-First-time/${token}`;

  const msg = {
    to: email,
    from: "anas.mailnodesender@gmail.com",
    subject: "Please Change your password!!",
    html: `<div style="background-color: #1f2937; padding: 20px; border-radius: 10px; color: white; font-family: sans-serif;">
    <h1 style="text-align: center;">Hello ${name}</h1>
    <p style="text-align: center;">Please Change your password!!</p>
    <p style="text-align: center;">Please use the code to confirm your password: ${code}</p>
    <p style="text-align: center;">Or click on this link: <a href="${link}">${link}</a></p>
    </div>`,
  };

  try {
    await mail.send(msg);
    return new NextResponse(JSON.stringify({ message: "Email sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Email not sent" }), {
      status: 500,
    });
  }
}
