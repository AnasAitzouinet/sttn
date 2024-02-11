"use server"
import { ConfirmationPrice } from "@/actions/stripe"
import { EmailTemplate } from "@/components/Emails/Verification-template"
import { Resend } from "resend"
import prisma from "./Prisma"
type data = {
    title: string | undefined,
    email: string,
    FullName: string,
    language: string,
    description: string,
    dateFrom: string | null,
    phone: string,
    people: number,
    type: string,
}

if (!process.env.RESEND_API_KEYs) throw new Error("RESEND_API_KEY is not defined")
import { NEXT_URL } from "@/index";

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${NEXT_URL}/Password-First-time?token=${token}`
    const resend = new Resend(process.env.RESEND_API_KEYs)

    try {
        await resend.emails.send({
            from: 'contact@utopialink.tech',
            to: email,
            subject: "Cahnge your Password",
            react: EmailTemplate({ verificationUrl }),
            text: "Please Change your Account password " + verificationUrl,
        })
        return { status: true, message: "Email Sent Successfully" }
    } catch (error) {
        return { status: false, message: error }
    }
}


export const sendReservationConfirmationEmail = async (data: data, email: string) => {
    const resend = new Resend(process.env.RESEND_API_KEYs)

    try {
        await resend.emails.send({
            from: 'contacst@utopialink.tech',
            to: email,
            subject: "Your Reservation is Sent",
            html: `
        <h1>Thank you for your reservation at Atlas Adventure transit </h1>
        please wait for our confirmation email
        <br/>
        <br/>
        it may take up to 24 hours to confirm your reservation
        <p>Reservation Details</p>
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
        return { status: true, message: "Email Sent Successfully" }
    } catch (error) {
        return { status: false, message: error }
    }

}

export const sendReservationEmail = async (data: data, email: string, types: "trip" | "activity") => {
    const resend = new Resend(process.env.RESEND_API_KEYs)

    try {
        await resend.emails.send({
            from: 'newReservations@utopialink.tech',
            to: email,
            subject: "New Reservation",
            html: `<p>Reservation Details - ${types}</p>
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
        return { status: true, message: "Email Sent Successfully" }
    } catch (error) {
        return { status: false, message: error }
    }

}

export const sendConfirmationsStatus = async ({ email, status, userId, resID, priceTag, img }: { email: string, status: string, userId: string | number, resID: number, priceTag: number, img: string }) => {
    const resend = new Resend(process.env.RESEND_API_KEYs)

    const stripeLink = await ConfirmationPrice({
        email,
        productName: "Reservation Confirmation",
        description: "Reservation Confirmation",
        price: priceTag,
        userId,
        resID,
        img
    })

    console.log(stripeLink.url)
    try {
        await resend.emails.send({
            from: 'contact@utopialink.tech',
            to: email,
            subject: status === "ACCEPTED" ? "Your Reservation is Confirmed" : "Your Reservation is Rejected",
            html: `
            <h1>Your Reservation is ${status}</h1>
            <p>please confirme your reservation by paying 20% of the initial price:  <a href="${stripeLink.url}">here</a></p>
            `,
        })
        return { status: true, message: "Email Sent Successfully" }
    } catch (error) {
        console.log(error)
        return { status: false, message: error }
    }

}

export const sendPaymentConfirmation = async ({ email, userId }: { email: string, userId: string | number }) => {
    const resend = new Resend(process.env.RESEND_API_KEYs)

    const user = await prisma.user_sttn.findUnique({
        where: {
            id: parseInt(userId as string)
        }
    })
    if (!user) throw new Error("User Not Found")

    try {
        await resend.emails.send({
            from: 'contacst@utopialink.tech',
            to: 'anasaw236@icloud.com',
            subject: `Payment is Confirmed by ${user.name}`,
            html: `
                <h1>Payment is Confirmed</h1>
                <p> ${user.name} has just pay the initial fees for his trip </p>
                `,
        })
        return { status: true, message: "Email Sent Successfully" }
    } catch (error) {
        console.log(error)
        return { status: false, message: error }
    }

}
