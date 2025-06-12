import { ChangePasswordForm } from "@/components/change-password-form";
import { ReturnButton } from "@/components/return-button";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/update-user-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  // if somehow middleware as first line of defense was bypassed this part will prevent access to the page
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: await headerList,
  });

  if (!session) {
    return redirect("/auth/login");
  }

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max--w-screen-lg space-y-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <ReturnButton href="/" label="Home" />
      </div>

      <div className="flex items-center gap-2">
        {session.user.role === "ADMIN" && (
          <Button size="sm" asChild>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </Button>
        )}
        <SignOutButton />
      </div>

      <h2 className="text-2xl font-bold">Permissions</h2>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      {session.user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.user.image}
          alt="User Image"
          className="size-32 border border-primary rounded-md object-cover"
        />
      ) : (
        <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {session.user.name.slice(0, 2)}
          </span>
        </div>
      )}

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-blue-600">
        <h2 className="text-2xl font-bold">Update User</h2>

        <UpdateUserForm
          name={session.user.name}
          image={session.user.image ?? ""}
        />
      </div>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-red-600">
        <h2 className="text-2xl font-bold">Change Password</h2>

        <ChangePasswordForm />
      </div>
    </div>
  );
}
