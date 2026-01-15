"use server";

import { db } from "@/lib/db";
import { Business } from "@/models/master";
import { User } from "@/models/types";
import { sql } from "kysely";
import { v4 as uuidv4 } from "uuid";
import { sendInviteEmail } from "./email";

const fetchBusinesses = async (): Promise<Business[]> => {
  const businesses = await db
    .selectFrom("master.business")
    .selectAll()
    .execute();
  console.log("Fetched Businesses:", businesses);
  return businesses;
};

const fetchBusinessById = async (id: number) => {
  const business = await db
    .selectFrom("master.business")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
  // ExectueTakeFirst to get a single record .Perfect for getting something By ID . It will return what we want or undefined if not found .
  //Exectue will return an array of records even if we expect only one .
  console.log("Fetched Business by ID:", business);
  return business;
};


const EditBusiness = async (req: object,isNew:boolean) => {
  const data = req as Business;

  // 1. Logic Check: If we have a valid ID, we update
  if (isNew === false) {
    console.log("data : ",data);
    console.log("Updating Business ID:", data.id);
    const result = await db
      .updateTable("master.business")
      .set({
        business_name: data.business_name,
        country: data.country,
        industry: JSON.stringify(data.industry),
        updated_at: new Date(), // Keep manual update or use a DB trigger
      })
      .where("id", "=", data.id)
      .returning("id") // Return the ID so the function always returns the same type
      .execute(); // Helper to get just the first result or undefined

    console.log("Returned ID :", result);
    return result?.[0]?.id;
  }

  // 2. Insert Logic: If no ID, create new
  else {
    console.log("Adding New Business:", data.business_name);
    const result = await db
      .insertInto("master.business")
      .values({
        business_name: data.business_name,
        country: data.country,
        industry: JSON.stringify(data.industry),
        // created_at and updated_at are handled by DEFAULT now() in your SQL
      })
      .returning("id")
      .executeTakeFirst();

    console.log("Added Business ID:", result);
    return result?.id;
  }
};


// Define the interface to match your frontend data
interface Invite {
  email: string;
  role: string;
}

export async function sendBulkInvites(businessId: number, adminId: number, invites: {email: string, role: string}[]) {
  
  // 1. Get business name for the email
  const business = await db
    .selectFrom("master.business")
    .select("business_name")
    .where("id", "=", businessId)
    .executeTakeFirst();

  for (const invite of invites) {
    // 2. Generate token & Save to tran.invitation (Your existing logic)
    const token = crypto.randomUUID();
    
    await db.insertInto("tran.invitation").values({
      email: invite.email,
      business_id: businessId,
      role: invite.role,
      token: token,
      // accepted_at is null by default
    }).execute();

    // 3. TRIGGER THE EMAIL
    await sendInviteEmail(invite.email, business?.name || "the business");
  }

  return { success: true, count: invites.length };
}

export { fetchBusinesses, fetchBusinessById, EditBusiness };
