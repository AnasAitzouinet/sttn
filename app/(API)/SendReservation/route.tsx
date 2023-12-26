import { NextRequest, NextResponse } from "next/server";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest) {
  const body = await req.json(); // or req.json() if you're expecting a JSON body
  const {
    title,
    email,
    FullName,
    language,
    description,
    dateFrom,
    phone,
    people,
    type,
  } = body;

  const msg = {
    to: "marwan.nejmeddine@gmail.com",
    from: "anas.mailnodesender@gmail.com",
    subject: "New Reservation",
    html: `
        <div style="background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; border: 1px solid #e5e5e5;">
        <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.ibb.co/5kz0Yyf/logo.png" alt="logo" width="100px" />
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">New Reservation ${type}</h1>
        <p style="font-size: 16px; margin-bottom: 10px;">FullName : ${FullName}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">email : ${email}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">phone number : ${phone}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">title : ${title}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">language : ${language}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">date from : ${dateFrom}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">people : ${people}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">description : ${description}</p>
        </div>
        </div>
        </div>
        
      
      `,
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
