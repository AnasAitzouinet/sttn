import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from './verification-token';
import prisma from '@/lib/Prisma';
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await prisma.verifications.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verifications.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}