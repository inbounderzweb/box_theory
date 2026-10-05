import { redirect } from "next/navigation";

// Any URL that doesn't match a page sends visitors back to the home page.
export default function NotFound() {
  redirect("/");
}
