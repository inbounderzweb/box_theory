import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ENQUIRY_STATUSES } from "@/lib/constants";

const contactEnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    packagingRequirement: { type: String, trim: true },
    estimatedQuantity: { type: String, trim: true },
    message: { type: String, required: true },
    referenceFile: {
      type: new Schema(
        {
          url: { type: String, required: true },
          publicId: { type: String, required: true },
          filename: { type: String },
        },
        { _id: false }
      ),
      required: false,
    },
    status: { type: String, enum: ENQUIRY_STATUSES, required: true, default: "NEW" },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

contactEnquirySchema.index({ status: 1, createdAt: -1 });

export type ContactEnquiryDocument = InferSchemaType<typeof contactEnquirySchema>;

export const ContactEnquiry: Model<ContactEnquiryDocument> =
  models.ContactEnquiry ?? model<ContactEnquiryDocument>("ContactEnquiry", contactEnquirySchema);
