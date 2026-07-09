  import NextAuth from "next-auth";
  import Credentials from "next-auth/providers/credentials";
  import bcrypt from "bcryptjs";

  import { authConfig } from "./auth.config";

  import { getUserByUsername } from "@/app/lib/userService";

  export const {
    handlers,
    auth,
    signIn,
    signOut,
  } = NextAuth({

    ...authConfig,

    providers: [

      Credentials({

        credentials: {
          username: {},
          password: {},
        },

        async authorize(credentials) {

          if (
            !credentials.username ||
            !credentials.password
          ) {
            return null;
          }

          const user =
            await getUserByUsername(
              credentials.username as string
            );

          if (!user) {
            return null;
          }

          const passwordCorrect =
            await bcrypt.compare(
              credentials.password as string,
              user.passwordHash
            );

          if (!passwordCorrect) {
            return null;
          }

          return {
            id: String(user.id),
            name: user.name,
            username: user.username
          };
        },
      }),
    ],
  });