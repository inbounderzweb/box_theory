import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { validateBannerImage, validateBannerVideo } from "@/lib/media-validation";
import { logAction } from "@/services/audit.service";
import { getLandingBanner, updateLandingBanner, deleteAllLandingBannerAssets, SLOT_KIND } from "@/services/landing-banner.service";
import { BANNER_SLOTS, type BannerSlot } from "@/models/LandingBanner";

export async function GET() {
  const user = await getCurrentUser();
  if (!can(user.role, "read", "settings")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(await getLandingBanner());
}

/**
 * Multipart update. Send any of the file fields `desktopImage`, `mobileImage`,
 * `desktopVideo`, `mobileVideo` to replace that slot, and/or repeat a `remove`
 * field naming a slot to clear it (the public site then uses its bundled default).
 */
export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!can(user.role, "update", "settings")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const uploads: Partial<Record<BannerSlot, Buffer>> = {};
  for (const slot of BANNER_SLOTS) {
    const file = formData.get(slot);
    if (!(file instanceof File) || file.size === 0) continue;

    const validation = SLOT_KIND[slot] === "image" ? await validateBannerImage(file) : await validateBannerVideo(file);
    if (!validation.ok) {
      return NextResponse.json({ error: `${slot}: ${validation.error}` }, { status: 422 });
    }
    uploads[slot] = validation.buffer;
  }

  const removals = formData
    .getAll("remove")
    .filter((value): value is BannerSlot => typeof value === "string" && (BANNER_SLOTS as readonly string[]).includes(value));

  if (Object.keys(uploads).length === 0 && removals.length === 0) {
    return NextResponse.json({ error: "No changes provided." }, { status: 400 });
  }

  const banner = await updateLandingBanner({ uploads, removals }, user.id);
  await logAction({
    userId: user.id,
    action: "UPDATE",
    entity: "LandingBanner",
    metadata: { replaced: Object.keys(uploads), removed: removals },
  });

  revalidatePath("/");
  revalidatePath("/admin/landing-banner");

  return NextResponse.json(banner);
}

/** Removes every banner asset from the site and from Cloudinary. */
export async function DELETE() {
  const user = await getCurrentUser();
  if (!can(user.role, "update", "settings")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deleted = await deleteAllLandingBannerAssets(user.id);
  await logAction({
    userId: user.id,
    action: "DELETE",
    entity: "LandingBanner",
    metadata: { deleted: deleted.map((a) => a.publicId) },
  });

  revalidatePath("/");
  revalidatePath("/admin/landing-banner");

  return NextResponse.json({ success: true, deleted: deleted.length });
}
