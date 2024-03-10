import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import prisma from '@/lib/Prisma'
import { UserLogin } from '@/schemas/index'
import { verifyPassword } from './lib/cryptoHash'

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = UserLogin.safeParse(credentials)
                if(validatedFields.success){
                    const { email, password } = validatedFields.data
                    const user = await prisma.user_sttn.findUnique({
                        where: {
                            email
                        }
                    })
                    if(!user || !user.password){
                        return null
                    }
            
                    const isValid = await verifyPassword(password, user.password)

                    if(isValid){
                        return {id: user.id.toString() , name: user.name, email: user.email, role: user.role}
                    }
                }
                return null
            }            
        })
    ],
} satisfies NextAuthConfig