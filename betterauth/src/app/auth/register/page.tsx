import { RegisterForm } from "@/components/register-form";
import React from "react";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max--w-screen-lg space-y-8">
      <div className="space-y-8">
        <div className="h1 text-3xl font-bold">Register</div>
      </div>
      {/*  Register Form */}
      <RegisterForm />
    </div>
  );
}
