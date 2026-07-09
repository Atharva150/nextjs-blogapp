import { db } from "../../db/db";
import { blogs } from "../../db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getBlogs() {
  return await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.likes));
}

export async function getBlog(id: number) {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id),

    with: {
        user: true,
    },
});
}

export async function createBlog( 
  title: string,
  author: string,
  url: string,
  userId: number
) {
  await db.insert(blogs).values({
    title,
    author,
    url,
    userId
  });
}


export async function incrementLikes(id: number) {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id));
}