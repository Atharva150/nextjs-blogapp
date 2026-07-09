"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import {
  createUser,
  getUserByUsername,
} from "@/app/lib/userService";

interface RegisterState {
  errors: {
     name?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  };

  values: {
    username: string;
    name: string;
  };
}

export async function registerUser(
  previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const username =
    formData.get("username") as string;

  const name =
    formData.get("name") as string;

  const password =
    formData.get("password") as string;

  const passwordConfirm =
    formData.get("passwordConfirm") as string;

  const errors: RegisterState["errors"] = {};

  if (username.length < 4) {
    errors.username =
      "Username must be at least 4 characters.";
  }

  if (password.length < 4) {
    errors.password =
      "Password must be at least 4 characters.";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm =
      "Passwords do not match.";
  }

  const existingUser =
    await getUserByUsername(username);

  if (existingUser) {
    errors.username =
      "Username already exists.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,

      values: {
        username,
        name,
      },
    };
  }

  const passwordHash =
    await bcrypt.hash(password, 10);

  await createUser({
    username,
    name,
    passwordHash,
  });

  redirect("/login");
}