"use server";

import { headers } from "next/headers";
import { fileTypeFromBuffer } from "file-type";
import { productEnquirySchema, type ProductEnquiryInput } from "@/validations/enquiry.schema";
import { createEnquiry } from "@/services/enquiry.service";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadToCloudinary } from "@/lib/cloudinary";

export type ProductEnquiryState = {
  errors?: Partial<Record<keyof ProductEnquiryInput | "referenceFile", string[]>>;
  message?: string;
  success?: boolean;
  name?: string;
} | undefined;

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const MAX_PDF_BYTES = 5 * 1024 * 1024;

export async function submitProductEnquiryAction(_prev: ProductEnquiryState, formData: FormData): Promise<ProductEnquiryState> {
  const validated = productEnquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") || undefined,
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website") || undefined,
  });

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    // A filled honeypot fails the "website" rule; answer generically so bots learn nothing.
    if (errors.website) return { message: "Something went wrong. Please try again." };
    return { errors };
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`product-enquiry:${ip}`, RATE_LIMIT).allowed) {
    return { message: "Too many submissions. Please try again in a few minutes." };
  }

  let referenceFile: { url: string; publicId: string; filename?: string } | undefined;
  const file = formData.get("referenceFile");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_PDF_BYTES) {
      return { errors: { referenceFile: ["The PDF must be 5 MB or smaller."] } };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    // Sniff the real content; a renamed file must not pass as a PDF.
    const detected = await fileTypeFromBuffer(buffer);
    if (detected?.ext !== "pdf") {
      return { errors: { referenceFile: ["Please attach a PDF file."] } };
    }

    try {
      const uploaded = await uploadToCloudinary(buffer, { folder: "enquiries" });
      referenceFile = { url: uploaded.secureUrl, publicId: uploaded.publicId, filename: file.name };
    } catch (error) {
      console.error("Failed to upload product enquiry PDF", error);
      return { message: "We couldn't upload your PDF. Please try again, or send your enquiry without it." };
    }
  }

  const { name, email, phone, message } = validated.data;
  try {
    await createEnquiry(
      { name, email, phone, message, subject: `Product enquiry — ${name}`, referenceFile },
      ip
    );
  } catch (error) {
    console.error("Failed to save product enquiry", error);
    return { message: "Something went wrong on our end. Please try again, or call us directly." };
  }

  return { success: true, name };
}
