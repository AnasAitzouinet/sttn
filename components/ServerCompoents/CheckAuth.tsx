"use server"
import { auth } from "@/auth";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export default async function CheckAuth() {
  const session = await auth();
  if (!session || !session.user) {
    return
  }
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
};

