import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { getLandingBanner } from "@/services/landing-banner.service";
import { BannerForm } from "./banner-form";

export const metadata: Metadata = { title: "Landing Banner" };

export default async function LandingBannerPage() {
  const user = await getCurrentUser();
  if (!can(user.role, "read", "settings")) redirect("/admin/dashboard");

  const banner = await getLandingBanner();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Landing Page Banner</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Images and videos for the home page hero. Upload at least a desktop image; the mobile image and videos are optional.
        </p>
      </div>
      <BannerForm initial={banner} canEdit={can(user.role, "update", "settings")} />
    </div>
  );
}
