import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings");
const success_url = absoluteUrl("/");
export async function GET(){
    try {
        const userId = 'deadxszxx14a';
        // const user = undefined;
        const user = {
            email:'ane11@gmail.com'
        }
        if(!userId || !user) {
            return new NextResponse(
                JSON.stringify({
                    error: {
                        message: "You must be signed in to do that.",
                        url: settingUrl,
                    },
                }),
                { status: 401 }
            );
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId,
            },
        });

        if (userSubscription && userSubscription.stripeCustomerId){
            const configuration = await stripe.billingPortal.configurations.create({
                business_profile: {
                  headline: 'Cactus Practice partners with   for simplified billing.',
                },
                features: {
                    
                    payment_method_update: {
                        enabled: true,
                    },
                    invoice_history: {
                        enabled: true,
                    },
                    subscription_cancel: {
                        enabled: true,
                    },
                    
                },
              });
            const stripeSession = await stripe.billingPortal.sessions.create({
                configuration: configuration.id,
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl,
            });
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }   

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: settingUrl,
            cancel_url: settingUrl,
            customer_email: user.email,
            // expand: ["line_items"],
            billing_address_collection: "required",
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            images: ["https://i.imgur.com/EHyR2nP.png"],
                            name: "Premium Utopia",
                            description: "Premium subscription",
                        },
                        unit_amount: 700,     
                                         
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
            payment_intent_data: {
                metadata: {
                    userId,
                    emailtest : user.email,

                }
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}