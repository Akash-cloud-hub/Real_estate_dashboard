"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; 
import { redirect } from "next/navigation";

export async function validateAndSyncUser() {
  console.log("--- START: validateAndSyncUser ---");
  
  const clerkUser = await currentUser();
  
  if (!clerkUser || !clerkUser.emailAddresses[0]) {
    console.log("❌ No Clerk user found or no email address.");
    return { allowed: false };
  }

  const email = clerkUser.emailAddresses[0].emailAddress;
  console.log(`🔍 Authenticated as: ${email}`);

  try {
    // 1. Check master."user" (Updated table name to master.user)
    console.log("Checking master.user table...");
    let internalUser = await db
      .selectFrom("master.user") 
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (internalUser) {
        console.log("✅ User already exists in master.user. ID:", internalUser.id);
    }

    // 2. Check tran."invitation" (Updated table name to tran.invitation)
    console.log("Checking tran.invitation table for pending invites...");
    const pendingInvite = await db
      .selectFrom("tran.invitation")
      .selectAll()
      .where("email", "=", email)
      // Note: If you don't have a 'status' column, comment the line below out
      // .where("status", "=", "pending") 
      .executeTakeFirst();

    console.log("Invitation search result:", pendingInvite ? "Found" : "Not Found");

    // 3. GATEKEEPER
    if (!internalUser && !pendingInvite) {
      console.log("🚫 Access Denied: No user record and no invite found.");
      return { allowed: false };
    }

    // 4. ONBOARDING SYNC
    if (!internalUser && pendingInvite) {
      console.log("✨ Processing new invite acceptance...");
      
      // Create user in master.user
      internalUser = await db
        .insertInto("master.user")
        .values({
          email: email,
          clerk_id: clerkUser.id,
          full_name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          created_at: new Date(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      
      console.log("👤 Created local user record with ID:", internalUser.id);

      // Link to business in master.business_user (or appropriate table)
      // Check your schema: Is business_user in master or tran?
      await db
        .insertInto("master.business_user")
        .values({
          business_id: pendingInvite.business_id,
          user_id: internalUser.id,
          role: pendingInvite.role,
        })
        .execute();
        
      console.log("🔗 Linked user to business ID:", pendingInvite.business_id);

      // Update invitation in tran.invitation
      await db
        .updateTable("tran.invitation")
        .set({ accepted_at: new Date() }) // Your schema uses accepted_at instead of status
        .where("id", "=", pendingInvite.id)
        .execute();

      console.log("✔️ Invitation marked as accepted.");

      return { 
        allowed: true, 
        user: internalUser, 
        firstTime: true, 
        businessId: pendingInvite.business_id 
      };
    }

    console.log("🔓 Access Granted to existing user.");
    return { allowed: true, user: internalUser };

  } catch (error: any) {
    // This will catch missing columns, schema errors, or connection issues
    console.error("🔥 DATABASE ERROR in validateAndSyncUser:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    throw error; // Rethrow so Next.js shows the error overlay
  }
}