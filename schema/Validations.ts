import * as z from "zod";

export const UserSchema = z.object({
    id:  z.coerce.number().optional(),
    username: z.string().nonempty('Username is required'),
    email: z.string().nonempty('Email is required'),
    mobile_number: z.string().nonempty('Mobile Number is required'),
    role: z.array(z.object({ role: z.string() })).nonempty('Role is required'),
});

export const BusinessSchema = z.object({
    id:  z.coerce.number().optional(),
    business_name: z.string().nonempty('Business Name is required'),
    country: z.string().nonempty('Country is required'),
    industry: z.array(z.object({ industry: z.string() })).nonempty('Industry is required'),
});

