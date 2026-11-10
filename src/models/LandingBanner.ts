import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const BANNER_SLOTS = ["desktopImage", "mobileImage", "desktopVideo", "mobileVideo"] as const;
export type BannerSlot = (typeof BANNER_SLOTS)[number];

const assetSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video"], required: true },
    bytes: { type: Number },
  },
  { _id: false }
);

// Singleton collection — exactly one document is expected to exist.
// A missing slot means the public site falls back to its bundled default asset.
const landingBannerSchema = new Schema(
  {
    desktopImage: { type: assetSchema, default: undefined },
    mobileImage: { type: assetSchema, default: undefined },
    desktopVideo: { type: assetSchema, default: undefined },
    mobileVideo: { type: assetSchema, default: undefined },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export type LandingBannerDocument = InferSchemaType<typeof landingBannerSchema>;

export const LandingBanner: Model<LandingBannerDocument> =
  models.LandingBanner ?? model<LandingBannerDocument>("LandingBanner", landingBannerSchema);
