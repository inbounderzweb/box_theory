import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { BlogForm } from "../blog-form";
import { createBlogPostAction } from "../actions";

export const metadata: Metadata = { title: "New Blog Post" };

export default async function NewBlogPostPage() {
  const user = await getCurrentUser();
  if (!can(user.role, "create", "blog")) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-neutral-900">New Blog Post</h1>
      <BlogForm
        action={createBlogPostAction}
        submitLabel="Create Post"
        canPublish={can(user.role, "publish", "blog")}
        defaultValues={{ authorName: user.name }}
      />
    </div>
  );
}
