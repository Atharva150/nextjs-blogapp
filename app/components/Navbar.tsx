import Link from "next/link";
import { auth, signOut } from "@/auth";
import "./navbar.css";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="navbar">

      <nav className="navbar-container">

        <Link
          href="/"
          className="navbar-logo"
        >
          Blog App
        </Link>

        <div className="navbar-links">

          <Link
            href="/"
            className="navbar-link"
          >
            Home
          </Link>

          <Link
            href="/blogs"
            className="navbar-link"
          >
            Blogs
          </Link>

          <Link
            href="/users"
            className="navbar-link"
          >
            Users
          </Link>

          {session ? (
            <>
              <Link
                href="/me"
                className="navbar-link"
              >
                My Profile
              </Link>

              <span className="navbar-user">
                Welcome,&nbsp;

                <span className="navbar-username">
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
                  className="logout-button"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="register-button"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="login-button"
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