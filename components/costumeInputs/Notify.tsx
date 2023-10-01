"use client";
import toast, { Toaster } from "react-hot-toast";

interface Notif {
  message: string;
  status: string;
}
const notify = ({ message, status }: Notif) => {
  status === "success" ? toast.success(message) : toast.error(message);
};

export default notify;
