"use server"
import prisma from "@/lib/Prisma"
import { stripe } from "@/lib/stripe"
import CheckAuth from "@/components/ServerCompoents/CheckAuth";

interface Stripe {
    email: string,
    productName: string
    description: string
    price: number
    userId: string | number
}
export const ConfirmationPrice = async ({
    productName,
    description,
    price,
    userId
}: Stripe) => {
    const settingUrl = '/'
    const unit_amount = (price * 100) * 0.2
    try {
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: settingUrl,
            cancel_url: settingUrl,
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            images: ["https://i.imgur.com/EHyR2nP.png"],
                            name: productName,
                            description,
                        },
                        unit_amount,

                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });
        return { success: 'Payment sent successfully', url: stripeSession.url }
    } catch (error) {
        console.log(error)
        return { error: 'An error occurred while creating payment link' }
    }
}
