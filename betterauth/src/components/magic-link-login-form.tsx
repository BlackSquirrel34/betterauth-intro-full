"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { StarIcon } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
          // reset the form
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  }

  return (
    <details
      ref={ref}
      className="max-w-sm rounded-md border border-purple-600 overflow-hidden"
    >
      <summary className="flex gap-2 items-center px-2 py-1  bg-purple-600 text-white hover:bg-purple-600/80 transition">
        Try Magic Link <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
          <Input type="email" id="email" name="email" />
          <Button disabled={isPending}>Send</Button>
        </div>
      </form>
    </details>
  );
};

// behavior that after opening the form will be visible:

/* 
    The <details> element is a native HTML element that creates a disclosure widget, which can be toggled open or closed.
    The <summary> element inside <details> acts as the toggle control. When you click on the <summary>, the <details> element's open attribute toggles between true and false.
    By default, clicking the <summary> will toggle the visibility of the content inside <details>, which in this case is the <form>.

Where is this behavior defined?

    Native HTML behavior: The toggling of the <details> element is built into the browser's default behavior. When the <summary> is clicked, the browser automatically toggles the open attribute on the <details> element.
    In your code: The <details> element is given a ref (ref={ref}) and controlled programmatically in the handleSubmit function:          

    if (ref.current) ref.current.open = false;

    This line closes the <details> element after a successful sign-in.

Summary:
    The behavior that clicking the purple area (the <summary>) makes the form fully visible is defined by the native HTML <details> and <summary> elements themselves. The toggling is automatic when the <summary> is clicked, thanks to the built-in browser behavior.
 */
