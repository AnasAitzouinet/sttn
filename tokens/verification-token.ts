import prisma from "@/lib/Prisma";


export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const token = await prisma.verifications.findFirst({
            where: { email: email }
        });
        return token;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const tokens = await prisma.verifications.findUnique({
            where: {  token }
        });
        return tokens;
    } catch (error) {
        return null;
    }
}