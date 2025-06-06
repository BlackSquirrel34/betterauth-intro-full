"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

export const RegisterForm = () => {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    /*     alert("Form submitted"); */
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);

    const name = String(formData.get("name"));
    if (!name) return toast.error("Please enter your name");

    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password");
    /*  alert(
      `Registering with data:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`
    ); */
    await signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {},
        onresponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      {/*  <form
        id="test-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("HTML form submitted");
        }}
      >
        <button type="submit">Test Submit</button>
      </form> */}
    </>
  );
};
