"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  header?: string;
  href?: string;
  footer?: string;
  description?: string;
    Socials?: boolean;
    className?: string;
}

export default function CardWrapper({
  children,
  header,
  href,
  footer,
  description,
  Socials = true,
  className
}: CardWrapperProps) {
  return (
    <Card className={cn(`w-screen  sm:w-[400px]  shadow-[#B2F5EA_0px_25px_50px_-12px]`,className)}>
      <CardHeader>
        <CardTitle className="text-center text-2xl ">
          {header || "Utopia"}
        </CardTitle>
        <CardDescription className="text-center">
          {description || "Log into your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        {
            Socials && (
                <div className="flex gap-x-2 ">
                <Button variant="outline" className="w-full">
                    <FcGoogle className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="w-full">
                    <FaFacebook className="h-5 w-5 text-blue-900" />
                </Button>
                </div>
            )
        }
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link
          href={href || "/Register"}
          prefetch={false}
          className="text-foreground text-sm"
        >
          {footer || "Don't have an account? Sign up"}
        </Link>
      </CardFooter>
    </Card>
  );
}
