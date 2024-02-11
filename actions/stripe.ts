"use server"
import prisma from "@/lib/Prisma"
import { stripe } from "@/lib/Stripe"
import CheckAuth from "@/components/ServerCompoents/CheckAuth";
import { NEXT_URL } from "@/index";
interface Stripe {
    email: string,
    productName: string
    description: string
    price: number
    userId: string | number
    resID: number
    img: string
}

export const ConfirmationPrice = async ({
    productName,
    description,
    price,
    userId,
    resID, 
    img
}: Stripe) => {
    const settingUrl = NEXT_URL
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
                            images: [img],
                            name: productName,
                            description,
                        },
                        unit_amount ,

                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                resID
            },
        });
        return { success: 'Payment sent successfully', url: stripeSession.url }
    } catch (error) {
        console.log(error)
        return { error: 'An error occurred while creating payment link' }
    }
}
