import { Industry } from "./master";
import { UserRole } from "./types";

export const roles: UserRole[] = [
  { role: "admin" },
  { role: "user" },
  { role: "customer" },
  { role: "manager" },
];

export const industries:Industry[] = [
  { industry: "Real Estate" },
  { industry: "Technology" },
  { industry: "Finance" },
  { industry: "Healthcare" },
  { industry: "Education" },
  { industry: "Retail" },
];