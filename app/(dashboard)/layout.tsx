// app/(dashboard)/layout.tsx
import { validateAndSyncUser } from "@/action/auth";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Check if user is logged into Clerk
  const { userId } = await auth();

  // If no user, the middleware will eventually catch them, 
  // but we return children so the Sign-in page can render.
  if (!userId) {
    return <>{children}</>;
  }

  // 2. Run your VIP/Kysely check
  const result = await validateAndSyncUser();

  if (!result.allowed) {
    redirect("/access-denied");
  }

  // 3. Handle first-time invite redirect
  if (result.firstTime && result.businessId) {
    redirect(`/addUser/${result.businessId}`); 
  }

  return <>{children}</>;
}