import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max--w-screen-lg space-y-8">
      <div className="space-y-8">
        <div className="h1 text-3xl font-bold">Login</div>
      </div>
      {/*  Login Form */}
      <LoginForm />
    </div>
  );
}
