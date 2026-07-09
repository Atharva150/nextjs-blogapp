    "use server";

    import { redirect } from "next/navigation";
    import {
    createBlog as createBlogInDB,
    incrementLikes,
    } from "./blogService";


    export async function createBlog(formData: FormData) {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;

    await createBlogInDB(title, author, url);

    redirect("/blogs");
    }

    export async function likeBlog(formData: FormData) {
    const id = Number(formData.get("id"));

    await incrementLikes(id);

    redirect(`/blogs/${id}`);
    }