import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-slate-800 bg-slate-900 shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
        >
          Blog App
        </Link>

        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="text-slate-300 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/blogs"
            className="text-slate-300 transition hover:text-white"
          >
            Blogs
          </Link>

          <Link
            href="/users"
            className="text-slate-300 transition hover:text-white"
          >
            Users
          </Link>

          {session ? (
            <>
              <Link
                href="/me"
                className="text-slate-300 transition hover:text-white"
              >
                My Page
              </Link>

              <span className="text-slate-400">
                Welcome,&nbsp;
                <span className="font-semibold text-white">
                  {session.user?.name}
                </span>
              </span>

              <form
                action={async () => {
                  "use server";

                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button
                  className="
                    rounded-lg
                    bg-red-600
                    px-4
                    py-2
                    font-medium
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="
                  rounded-lg
                  border
                  border-slate-700
                  px-4
                  py-2
                  text-slate-300
                  transition
                  hover:border-blue-500
                  hover:text-white
                "
              >
                Register
              </Link>

              <Link
                href="/login"
                className="
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}