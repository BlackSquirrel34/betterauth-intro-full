"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
// import { parseSetCookieHeader } from "better-auth/cookies";
// import { cookies } from "next/headers";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    // const res = await auth.api.signInEmail({ is needed for setting cookie manually
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      // asResponse: true, // needed for setting cookie manuelly
    });

    /*   // how to set a cookie manually
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
        // grab cookie from the header
        const cookie = parseSetCookieHeader(setCookieHeader)
        const cookieStore = await cookies();

        // formatting cookie
        const [key, cookieAttributes] = [...cookie.entries()][0];
        const value = cookieAttributes.value;
        const maxAge = cookieAttributes["max-age"];
        const path = cookieAttributes.path;
        const httpOnly = cookieAttributes.httponly;
        const sameSite = cookieAttributes.samesite;

        // set cookie with these values
        cookieStore.set(key, decodeURIComponent(value), {
            maxAge,
            path,
            httpOnly,
            sameSite,
        }) 

    } */

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
