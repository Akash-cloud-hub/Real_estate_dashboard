// "use server";

// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db"; // or wherever your Prisma/DB client is
// import { users, invitations, businessMembers } from "@/models/schema"; // Your Drizzle/Prisma schemas
// import { eq } from "drizzle-orm";

// export const onUserLogin = async () => {
//   // 1. Get the authenticated user from Clerk
//   const user = await currentUser();
//   if (!user || !user.emailAddresses[0]) return redirect("/sign-in");

//   const email = user.emailAddresses[0].emailAddress;

//   // 2. Check if user exists in YOUR local DB
//   // (Pseudo-code matching your likely schema)
//   let dbUser = await db.query.users.findFirst({
//     where: eq(users.email, email),
//   });

//   // 3. If not, create them locally
//   if (!dbUser) {
//     [dbUser] = await db.insert(users).values({
//       email: email,
//       name: `${user.firstName} ${user.lastName}`,
//       clerkId: user.id, // Store Clerk ID to link them!
//       image: user.imageUrl,
//     }).returning();
//   }

//   // 4. --- THE MAGIC PART: CHECK FOR INVITES ---
//   const pendingInvites = await db.query.invitations.findMany({
//     where: eq(invitations.email, email),
//   });

//   if (pendingInvites.length > 0) {
//     for (const invite of pendingInvites) {
//       // Add user to the business
//       await db.insert(businessMembers).values({
//         userId: dbUser.id,
//         businessId: invite.businessId,
//         role: invite.role,
//       });

//       // Delete the invitation (it's accepted now)
//       // await db.delete(invitations).where(eq(invitations.id, invite.id));
//       // OR mark as accepted:
//       await db.update(invitations)
//         .set({ status: "accepted" })
//         .where(eq(invitations.id, invite.id));
//     }
    
//     // Determine where to redirect (e.g., the first business found)
//     const firstBusinessId = pendingInvites[0].businessId;
//     return `/business/${firstBusinessId}`; // Send them to their new team!
//   }

//   return "/dashboard"; // No invites, go to standard dashboard
// };