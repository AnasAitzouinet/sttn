"use server"
import { auth , signOut} from "@/auth";
const Logouts = async() => {
  await signOut()
};

export default Logouts;