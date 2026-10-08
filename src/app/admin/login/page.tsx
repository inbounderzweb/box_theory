import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const FEATURES = [
  { title: "Manage Content", description: "Publish pages, services, and blog posts in one place." },
  { title: "Track Enquiries", description: "Respond to customer enquiries and quote requests." },
  { title: "Role-Based Access", description: "Give your team exactly the access they need." },
];

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/images/hero_section/desktop_banner_img1.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="scale-110 object-cover object-[75%_center] blur-md"
        />
        <div className="absolute inset-0 bg-[#4a3831]/65" />

        <div className="relative flex h-full flex-col p-10 xl:p-12">
          <Link href="/" className="w-fit text-sm text-white/80 hover:text-white">
            ← Back to home
          </Link>

          <div className="m-auto flex w-full max-w-md flex-col items-center gap-8 text-center text-white">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl font-bold xl:text-4xl">Manage {siteConfig.name}, All in One Place</h2>
              <p className="max-w-sm text-white/80">
                Sign in to your admin dashboard to keep the site, services, and customer enquiries up to date.
              </p>
            </div>

            <ul className="flex flex-col gap-5 text-left">
              {FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#b99a60]" />
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[#f1ebdf] px-4 py-10 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-sm rounded-2xl border border-[#ded2bc] bg-white p-6 shadow-xl shadow-[#4a3831]/10 sm:max-w-md sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <Image src="/images/logos/Box%20Theory%20Logo-01%20(1).svg" alt={siteConfig.name} width={746} height={282} priority className="h-16 w-auto" />
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-[#4a3831] sm:text-2xl">Login to Your Account</h1>
              <p className="text-sm text-[#6b5d56]">Sign in to manage your site content.</p>
            </div>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-neutral-500 hover:text-neutral-700 lg:hidden"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12.5 2.5 2.5 5.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
