"use server";

import { headers } from "next/headers";
import { fileTypeFromBuffer } from "file-type";
import { enquiryInputSchema, type EnquiryInput } from "@/validations/enquiry.schema";
import { createEnquiry } from "@/services/enquiry.service";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadToCloudinary } from "@/lib/cloudinary";

export type ContactFormState = {
  errors?: Partial<Record<keyof EnquiryInput, string[]>>;
  message?: string;
  success?: boolean;
} | undefined;

const CONTACT_RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const MAX_REFERENCE_BYTES = 5 * 1024 * 1024;
const ALLOWED_REFERENCE_TYPES = new Set(["jpg", "png", "webp", "pdf"]);

export async function submitEnquiryAction(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validated = enquiryInputSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    packagingRequirement: formData.get("packagingRequirement") || undefined,
    estimatedQuantity: formData.get("estimatedQuantity") || undefined,
    message: formData.get("message"),
    website: formData.get("website") || undefined,
  });

  if (!validated.success) {
    // A filled honeypot fails the "website" field's max(0) rule — reported
    // as a generic error rather than tipping off the bot to what happened.
    if (validated.error.flatten().fieldErrors.website) {
      return { message: "Something went wrong. Please try again." };
    }
    return { errors: validated.error.flatten().fieldErrors };
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const rateLimit = checkRateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);
  if (!rateLimit.allowed) {
    return { message: "Too many submissions. Please try again later." };
  }

  let referenceFile: { url: string; publicId: string; filename?: string } | undefined;
  const file = formData.get("referenceFile");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_REFERENCE_BYTES) {
      return { message: "Reference file must be 5 MB or smaller." };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = await fileTypeFromBuffer(buffer);
    if (!detected || !ALLOWED_REFERENCE_TYPES.has(detected.ext)) {
      return { message: "Reference file must be a JPG, PNG, WEBP, or PDF." };
    }

    try {
      const uploaded = await uploadToCloudinary(buffer, { folder: "enquiries" });
      referenceFile = { url: uploaded.secureUrl, publicId: uploaded.publicId, filename: file.name };
    } catch (error) {
      console.error("Failed to upload enquiry reference file", error);
      return { message: "We couldn't upload your reference file. Please try again without it, or email it to us directly." };
    }
  }

  const data = { ...validated.data, website: undefined };

  try {
    await createEnquiry(
      {
        ...data,
        subject:
          data.subject ||
          `Packaging enquiry — ${data.packagingRequirement || data.company || data.name}`,
        referenceFile,
      },
      ip
    );
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return { message: "Something went wrong on our end. Please try again, or reach out by phone or email directly." };
  }

  return { success: true };
}
