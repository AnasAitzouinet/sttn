import { EmailTemplate } from "@/components/Emails/Verification-template"
import { Resend } from "resend"

type data ={
    title: string,
    email: string,
    FullName: string,
    language : string,
    description : string,
    dateFrom : string,
    phone : string,
    people : number,
    type : string,
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
     const verificationUrl = `http://localhost:3000/Password-First-time?token=${token}`

 try {
     await resend.emails.send({
          from: 'contact@utopialink.tech',
          to: email,
          subject: "Verify your email",
          react: EmailTemplate({verificationUrl}),
          text: "Please verify your email by clicking the link below:\n" + verificationUrl,
     })
     return {status : true , message : "Email Sent Successfully"}
 } catch (error) {
     return {status : false , message : error}
 }
}

export const sendReservationEmail = async (data : data , email :string) => {
   try {
     await resend.emails.send({
         from: 'newReservations@utopialink.tech',
         to: email,
         subject: "New Reservation",
         html: `<p>Reservation Details</p>
         <p>Title : ${data.title}</p>
         <p>FullName : ${data.FullName}</p>
         <p>Language : ${data.language}</p>
         <p>Description : ${data.description}</p>
         <p>Date From : ${data.dateFrom}</p>
         <p>Phone : ${data.phone}</p>
         <p>People : ${data.people}</p>
         <p>Type : ${data.type}</p>
         `,
     })
     return {status : true , message : "Email Sent Successfully"}
   } catch (error) {
         return {status : false , message : error}
   }
    
}