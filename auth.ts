import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/Prisma"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },  
  callbacks: {
    async jwt ({ token }) {
      if (token.sub) {
        const user = await prisma.user_sttn.findUnique({
          where: {
            id: parseInt(token.sub)
          }
        })
        if(user){
          token.role = user.role as string
        }
      }
      return token
    },

    async session({ session,  token }) {
      if(token.sub && session.user){
        session.user.id = token.sub
        const user = await prisma.user_sttn.findUnique({
          where: {
            id: parseInt(token.sub)
          }
        })
        if(user){
          session.user.role = user.role as string
        }
      }
      return session
    },
  }
})