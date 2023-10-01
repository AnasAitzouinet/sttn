"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, useSpring, animate } from "framer-motion";
import { useState } from "react";
import Input from "@/components/costumeInputs/Inputs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import notify from "../costumeInputs/Notify";
import { Toaster } from "react-hot-toast";
import Loader from "../loader";
import Cookies from "../ServerCompoents/Cookies";
import { useRouter } from "next/navigation";
interface Props {
  trigger: React.ReactNode;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { email, password } = form;
    if (email.length && password.length) {
      if (!EmailRegex.test(email)) {
        notify({ message: "Email is not valid", status: "error" });
        return false;
      }
      const newForm = {
        email,
        password,
      };
      return newForm;
    } else {
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const handleErrors = handleError();
      if (!handleErrors) return;
      setLoading(true);

      await fetch(
        "https://gestionres-production.up.railway.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(handleErrors),
        }
      ).then(async (res) => {
        if (res.ok) {
          setLoading(false);
          notify({
            message: "Logged in successfully",
            status: "success",
          });
          Cookies({
            name: "token",
            value: await res.json(),
            options: {
              maxAge: 60 * 60 * 24,
              path: "/",
            },
          })
          // router.refresh();
          window.location.reload();
          console.log(await res.json());
          return;
        } else {
          setLoading(false);
          notify({ message: "email or password are not correct", status: "error" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <Toaster />
      <h1 className="text-2xl font-bold capitalize">
        Welcom Back our {""}
        <span className="text-blue-700">Traveler</span>
      </h1>
      <span className="text-sm  text-gray-300 font-medium capitalize">
        Sign in to your account
      </span>
      <form onSubmit={handleSubmit} className="h-full w-full flex gap-5 flex-col justify-center items-center py-5">
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="text-white"
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}  
          className="text-white"

        />
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 transition-all duration-500 text-white w-full py-2 rounded-full">
          Sign in
        </button>
      </form>
    </div>
  );
};
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    FullName: "",
    email: "",
    phone: "",
    password: "",
    ConPassword: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    phone: false,
    FullName: false,
    password: false,
    ConPassword: false,
  });
  const handleError = () => {
    const EmailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const { FullName, email, phone, password, ConPassword } = form;
    if (
      FullName.length &&
      email.length &&
      phone.length &&
      password.length &&
      ConPassword.length
    ) {
      if (!EmailRegex.test(email)) {
        setFormError({ ...formError, email: true });
        notify({ message: "Email is not valid", status: "error" });

        return false;
      } else if (password !== ConPassword) {
        setFormError({ ...formError, password: true, ConPassword: true });
        notify({ message: "Passwords are not the same", status: "error" });
        return false;
      }
      const newForm = {
        name: FullName,
        email,
        phone_number: phone,
        password,
        role: "CLIENT",
      };
      return newForm;
    } else {
      setFormError({
        FullName: !FullName.length,
        email: !email.length,
        phone: !phone.length,
        password: !password.length,
        ConPassword: !ConPassword.length,
      });
      notify({ message: "Please fill all the fields", status: "error" });
      return false;
    }
  };
  const ResetError = () => {
    setFormError({
      email: false,
      phone: false,
      FullName: false,
      password: false,
      ConPassword: false,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const handleErrors = handleError();
      if (!handleErrors) return;
      setLoading(true);

      await fetch(
        "https://gestionres-production.up.railway.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(handleErrors),
        }
      ).then(async (res) => {
        if (res.ok) {
          setLoading(false);
          notify({
            message: "Account created successfully",
            status: "success",
          });
          ResetError();
          Cookies({
            name: "token",
            value: await res.json(),
            options: {
              maxAge: 60 * 60 * 24,
              path: "/",
            },
          })
          // router.refresh();
          window.location.reload();
          console.log(await res.json());
          return;
        } else {
          setLoading(false);
          notify({ message: "Something went wrong", status: "error" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <Toaster />
      <h1 className="text-2xl font-bold capitalize">
        First time here, {""}
        <span className="text-blue-700">Traveler?</span>
      </h1>
      <span className="text-sm  text-gray-300 font-medium capitalize">
        create an account
      </span>
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex gap-3 flex-col justify-center items-center py-5"
      >
        {loading === true ? (
          <div className=" h-1/2 flex flex-col justify-center items-center">
            <Loader className="bg-transparent h-1/2 w-1/3 " imgClass="sm:p-0" />
          </div>
        ) : (
          <>
            <Input
              placeholder="Full Name"
              type="text"
              onChange={(e) => setForm({ ...form, FullName: e.target.value })}
              className={`text-white ${
                formError.FullName ? "border-red-500 italic text-red-500" : ""
              }`}
            />
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`text-white ${
                formError.email ? "border-red-500 italic text-red-500" : ""
              }`}
            />
            <Input
              placeholder="phone number"
              type="text"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`text-white ${
                formError.phone ? "border-red-500 italic text-red-500" : ""
              }`}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`text-white ${
                formError.password ? "border-red-500 italic text-red-500" : ""
              }`}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              onChange={(e) =>
                setForm({ ...form, ConPassword: e.target.value })
              }
              className={`text-white ${
                formError.ConPassword
                  ? "border-red-500 italic text-red-500"
                  : ""
              }`}
            />
            <label className="flex justify-start gap-3 w-full px-2 items-center">
              <motion.input
                type="checkbox"
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.2 }}
                className="w-5 h-5 rounded-full 
          bg-transparent
          border border-gray-300/40 focus:ring-0 focus:outline-none focus:border-0"
              />
              <span className="text-sm text-gray-300 font-medium capitalize">
                I agree to the terms and conditions
              </span>
            </label>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 transition-all duration-500 text-white w-full py-2 rounded-full"
            >
              Sign in
            </button>
          </>
        )}
      </form>
    </div>
  );
};
const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent backdrop-blur-3xl">
        <Tabs defaultValue="Sign-up" className="w-full px-5 ">
          <TabsList className="w-full rounded-full ">
            <TabsTrigger
              className="w-full rounded-full transition-all"
              value="Sign-up"
            >
              Sign up
            </TabsTrigger>
            <TabsTrigger
              className="w-full rounded-full transition-all"
              value="Sign-in"
            >
              Sign in
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Sign-up">
            <SignUp />
          </TabsContent>
          <TabsContent value="Sign-in">
            <SignIn />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
