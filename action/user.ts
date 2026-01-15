"use server";

import { db } from "@/lib/db";
import { Business } from "@/models/master";
import { User } from "@/models/types";
import { sql } from "kysely";
import { v4 as uuidv4 } from "uuid";

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

// const findBusinessId = async (req:object) => {
//     const data = req as Business;
//     const business = await db.selectFrom('master.business')
//     .selectAll()
//     .where('business_name', '=', data.business_name)
//     .executeTakeFirst();
//     console.log("Found Business ID:", business?.id);
//     return business?.id;
// }

// SELECT b.title,COUNT(br.book_id) FROM master."books" b
// LEFT JOIN tran."borrowing_records" br ON br.book_id = b.id
// GROUP BY b.title;"

// Define the interface to match your frontend data
interface Invite {
  email: string;
  role: string;
}

export async function sendBulkInvites(
  businessId: number,
  adminId: number,
  invites: Invite[]
) {
  try {
    const inviteData = invites.map((invite) => ({
      email: invite.email,
      business_id: businessId,
      role: invite.role,
      // invited_by: adminId,
      token: uuidv4(),
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    }));

    await db.insertInto("tran.invitation").values(inviteData).execute();

    return { success: true, count: invites.length };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Database insertion failed" };
  }
}

export { fetchBusinesses, fetchBusinessById, EditBusiness };
