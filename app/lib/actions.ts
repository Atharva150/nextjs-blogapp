"use server";

import { blogs } from "./blogs";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  blogs.push({
    id: blogs.length + 1,
    title,
    author,
    url,
    likes: 0,
  });
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"));

  const blog = blogs.find((b) => b.id === id);

  if (blog) {
    blog.likes += 1;
  }

  redirect(`/blogs/${id}`);
}