"use server";

import { redirect } from "next/navigation";
import { createBlog } from "@/app/lib/blogService";
import { incrementLikes } from "@/app/lib/blogService";

interface FormState {
  errors: {
    title?: string;
    author?: string;
    url?: string;
    general?: string;
  };

  values: {
    title: string;
    author: string;
    url: string;
  };
}

export async function likeBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));

  await incrementLikes(id);

  redirect(`/blogs/${id}`);
}

export async function createBlogAction(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = String(formData.get("title") ?? "");
  const author = String(formData.get("author") ?? "");
  const url = String(formData.get("url") ?? "");

  const errors: FormState["errors"] = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  }

  if (!author.trim()) {
    errors.author = "Author is required";
  }

  if (!url.trim()) {
    errors.url = "URL is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: {
        title,
        author,
        url,
      },
    };
  }

  try {
    await createBlog(title, author, url);
  } catch {
    return {
      errors: {
        general: "Failed to create blog.",
      },
      values: {
        title,
        author,
        url,
      },
    };
  }

  redirect("/blogs");
}