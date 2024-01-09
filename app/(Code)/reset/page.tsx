"use client"
import { passwordSender } from "@/actions/password";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        passwordSender("anasaw236@gmail.com");
    }
  return (
    <form onSubmit={onSubmit}>
      <Button
        type="submit"
      >
        send
      </Button>
    </form>
  );
}
