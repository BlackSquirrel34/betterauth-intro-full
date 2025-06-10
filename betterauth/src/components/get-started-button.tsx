"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size="lg" className="opacity-50" asChild>
        Get Started
      </Button>
    );
  }

  const href = session ? "/profile" : "/auth/login";
  // debugging
  if (session) {
    console.log("# User role: from get-started-button", session.user.role);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" asChild>
        <Link href={href}>Get Started</Link>
      </Button>

      {session && (
        <p className="flex items-center gap-2">
          <span
            data-role={session.user.role} // displaying blue/red dot does not work, although role can be accessed
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
          />
          Welcome back, {session.user.name} as {session.user.role} ! 👋
        </p>
      )}
    </div>
  );
};
