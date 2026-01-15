"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(email: string, businessName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "AI Agency <akash-irshula@echo-labs.io>", // Replace with your domain once verified
      to: [email],
      subject: `You've been invited to join ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #7c3aed;">Welcome to the Team.</h2>
          <p>You have been invited to manage AI Voice Agents for <strong>${businessName}</strong>.</p>
          <p>Click the button below to create your account and get started.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/sign-up" 
              style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
              Accept Invitation
          </a>
          <hr style="margin-top: 32px; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">If you weren't expecting this invite, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("Email Exception:", err);
    return { success: false };
  }
}
