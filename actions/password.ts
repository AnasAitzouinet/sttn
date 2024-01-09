"use server";
import { generateVerificationToken } from "@/tokens/token";
import { sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByToken } from "@/tokens/verification-token";
import prisma from "@/lib/Prisma";

export const passwordSender = async (email: string) => {
    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token.token);
}


export const passwordUpdater = async (token: string, password: string) => {
    const tokenData = await getVerificationTokenByToken(token);
    if (!tokenData) {
        console.log('invalid token')
        return null
    };

    if (tokenData.expires < new Date()) {
        console.log('Token expired')
        return null
    };


    try {
        await fetch('https://gestionres-production.up.railway.app/api/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: tokenData.email,
                password
            })

        })
        await prisma.verifications.delete({
            where: {
                id: tokenData.id
            }
        })
        console.log('Password updated')
        window.location.replace('/')
    } catch (error) {
        console.log(error)
    }

}