"use server";
import { generateVerificationToken } from "@/tokens/token";
import { sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByToken } from "@/tokens/verification-token";
import prisma from "@/lib/Prisma";
import { redirect } from 'next/navigation'

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
        await fetch(`https://gestionres-production.up.railway.app/api/users/reset-password?email=${tokenData.email}&newPassword=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                return { message: data, success: true }
            }
            else {
                const data = await res.json()
                console.log(data)
                return { message: data, success: false }
            }
        }).catch(err => console.log(err))

        await prisma.verifications.delete({
            where: {
                id: tokenData.id
            }
        })
        console.log('Password updated')
        return { message: 'Password updated', success: true }
    } catch (error) {
        console.log(error)
        return { message: error, success: false }
    }

}

