import { NextRequest, NextResponse } from "next/server";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest) {
  const body = await req.json(); // or req.json() if you're expecting a JSON body
  const { email, subject, message } = body;
  const msg = {
    to: email,
    from: "marwan.nejmeddine@gmail.com",
    subject: subject,
    text: message,
    html: message,
};
try {
    await mail.send(msg);
    return new NextResponse(JSON.stringify({ message: 'Email sent' }), {status:200});
} catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Email not sent' }), {status:500});
}
}
