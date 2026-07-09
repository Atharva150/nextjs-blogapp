import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  return await db.query.users.findMany({
    with: {
      blogs: true,
    },
  });
}

export async function getUser(username: string) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),

    with: {
      blogs: true,
    },
  });
}

export async function getUserByUsername(
  username: string
) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export async function createUser(data: {
  username: string;
  name: string;
  passwordHash: string;
}) {
  await db.insert(users).values({
    username: data.username,
    name: data.name,
    passwordHash: data.passwordHash,
  });
}

export async function getUserById(id: number) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}