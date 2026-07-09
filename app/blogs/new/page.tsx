import { auth } from "@/auth";
import { redirect } from "next/navigation";

import NewBlogForm from "./NewBlogForm";

export default async function NewBlogPage() {
  // Check authentication
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Create New Blog
        </h1>

        <p className="mt-2 text-slate-400">
          Fill in the details below to publish a new blog.
        </p>
      </div>

      {/* Client Form */}
      <NewBlogForm />
    </div>
  );
}