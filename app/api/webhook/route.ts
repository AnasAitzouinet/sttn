import Stripe from "stripe";
import { headers } from "next/headers"
import { NextResponse } from "next/server";

import prisma from "@/lib/Prisma";
import { stripe } from "@/lib/Stripe";
import { sendPaymentConfirmation } from "@/lib/mail";
import { parse } from "path";

export async function POST(req: Request) {  
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed") {
        // const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);

        if (!session?.metadata?.userId) {
            return new NextResponse(JSON.stringify({ error: "Missing metadata" }), { status: 400 });
        }

        if (paymentIntent) {
            await prisma.paymentIntent.create({
                data: {
                    stripePaymentIntentId: paymentIntent.id as string,
                    amount: paymentIntent.amount as number,
                    userId: session.metadata.userId,
                    stripeCustomerId: paymentIntent.customer as any,
                    reservationId: parseInt(session.metadata.resID),
                },
            });
            await prisma.user_sttn.update({
                where: {
                    id: parseInt(session.metadata.userId as string)
                },
                data: {
                    paymentIntentId: paymentIntent.id as string
                }
            })
            await sendPaymentConfirmation({ email: paymentIntent.receipt_email as string, userId: session.metadata.userId })
        }
    }

    return new NextResponse("ok", { status: 200 });
}