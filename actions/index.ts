"use server"
import prisma from "@/lib/Prisma";


export async function getUserPayments() {
    try {
      const user = await prisma.paymentIntent.findMany();
      return user;
    } catch (error) {
      console.error("Error fetching user payments:", error);
      throw error; // Rethrow the error for the parent handler
    }
  }