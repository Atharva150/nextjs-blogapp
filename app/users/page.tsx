import Link from "next/link";
import { getUsers } from "@/app/lib/userService";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="mt-2 text-slate-400">
          Browse all registered users.
        </p>
      </div>

      <div className="grid gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              p-6
            "
          >
            <Link
              href={`/users/${user.username}`}
              className="
                text-2xl
                font-semibold
                text-blue-400
                hover:underline
              "
            >
              {user.name}
            </Link>

            <p className="mt-2 text-slate-400">
              @{user.username}
            </p>

            <p className="mt-4">
              Blogs:{" "}
              <span className="font-bold">
                {user.blogs.length}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}