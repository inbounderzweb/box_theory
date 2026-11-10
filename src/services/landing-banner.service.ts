import "server-only";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { LandingBanner, BANNER_SLOTS, type BannerSlot } from "@/models/LandingBanner";

export type BannerAsset = { url: string; publicId: string; resourceType: "image" | "video"; bytes?: number };
export type LandingBannerData = Partial<Record<BannerSlot, BannerAsset>>;

export const SLOT_KIND: Record<BannerSlot, "image" | "video"> = {
  desktopImage: "image",
  mobileImage: "image",
  desktopVideo: "video",
  mobileVideo: "video",
};

function pickAssets(doc: Record<string, unknown> | null): LandingBannerData {
  const data: LandingBannerData = {};
  if (!doc) return data;
  for (const slot of BANNER_SLOTS) {
    const asset = doc[slot] as BannerAsset | undefined;
    if (asset?.url) {
      data[slot] = { url: asset.url, publicId: asset.publicId, resourceType: asset.resourceType, bytes: asset.bytes };
    }
  }
  return data;
}

/** Returns the configured banner assets; empty slots mean "use the bundled default". Never throws so the public page stays up if the DB is unreachable. */
export async function getLandingBanner(): Promise<LandingBannerData> {
  try {
    await connectToDatabase();
    const doc = await LandingBanner.findOne().lean();
    return pickAssets(doc as Record<string, unknown> | null);
  } catch {
    return {};
  }
}

export async function updateLandingBanner(
  changes: { uploads: Partial<Record<BannerSlot, Buffer>>; removals: BannerSlot[] },
  userId: string
): Promise<LandingBannerData> {
  await connectToDatabase();
  const existing = pickAssets((await LandingBanner.findOne().lean()) as Record<string, unknown> | null);

  const $set: Record<string, unknown> = { updatedBy: userId };
  const $unset: Record<string, 1> = {};
  const orphans: BannerAsset[] = [];

  for (const slot of BANNER_SLOTS) {
    const buffer = changes.uploads[slot];
    if (buffer) {
      const kind = SLOT_KIND[slot];
      const result = await uploadToCloudinary(buffer, { folder: "landing-banner", resourceType: kind });
      $set[slot] = { url: result.secureUrl, publicId: result.publicId, resourceType: kind, bytes: result.bytes };
      if (existing[slot]) orphans.push(existing[slot]);
    } else if (changes.removals.includes(slot) && existing[slot]) {
      $unset[slot] = 1;
      orphans.push(existing[slot]);
    }
  }

  const update: Record<string, unknown> = { $set };
  if (Object.keys($unset).length > 0) update.$unset = $unset;

  const saved = await LandingBanner.findOneAndUpdate({}, update, { new: true, upsert: true, setDefaultsOnInsert: true }).lean();

  // Only delete replaced/removed assets after the DB points at the new ones, so a failure never leaves a dangling reference.
  await destroyAssets(orphans);

  return pickAssets(saved as Record<string, unknown> | null);
}

/** Deletes files from Cloudinary; failures are logged (not thrown) so the DB change still succeeds. */
async function destroyAssets(assets: BannerAsset[]): Promise<void> {
  const results = await Promise.allSettled(assets.map((a) => deleteFromCloudinary(a.publicId, a.resourceType)));
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Cloudinary delete failed for ${assets[i].publicId}:`, result.reason);
    }
  });
}

/** Clears every banner slot and deletes all of its files from Cloudinary. */
export async function deleteAllLandingBannerAssets(userId: string): Promise<BannerAsset[]> {
  await connectToDatabase();
  const existing = pickAssets((await LandingBanner.findOne().lean()) as Record<string, unknown> | null);
  const assets = Object.values(existing);
  if (assets.length === 0) return [];

  const $unset = Object.fromEntries(BANNER_SLOTS.map((slot) => [slot, 1]));
  await LandingBanner.findOneAndUpdate({}, { $unset, $set: { updatedBy: userId } });
  await destroyAssets(assets);
  return assets;
}
