import { z } from "zod";

export const enquiryInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(150).optional(),
  packagingRequirement: z.string().trim().max(200).optional().or(z.literal("")),
  estimatedQuantity: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
  // Honeypot: real users never see or fill this field; bots that
  // autofill every input do. Non-empty means "reject silently".
  // Named "website" (not "company") since Company is now a real, visible field.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

/** Quick enquiry under Featured Products: name, mobile and message are required; email is optional. */
export const productEnquirySchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(1, "Please share a mobile number")
    .refine((value) => {
      if (!/^[0-9+\-\s()]{7,20}$/.test(value)) return false;
      const digits = value.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "Enter a valid mobile number"),
  message: z.string().trim().min(1, "Please add a short message").max(2000, "Please keep your message under 2000 characters"),
  // Honeypot, same convention as enquiryInputSchema.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ProductEnquiryInput = z.infer<typeof productEnquirySchema>;
