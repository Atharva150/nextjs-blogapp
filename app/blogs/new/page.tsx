import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "./newBlog.css"
import NewBlogForm from "./NewBlogForm";

export default async function NewBlogPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="new-blog-page">

      <div className="new-blog-header">
        <h1 className="new-blog-title">
          Create New Blog
        </h1>

        <p className="new-blog-description">
          Fill in the details below to publish a new blog.
        </p>
      </div>

      <NewBlogForm />

    </div>
  );
}