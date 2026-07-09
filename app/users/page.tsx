import Link from "next/link";
import { getUsers } from "@/app/lib/userService";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="mt-2 text-slate-400">
          Browse all registered users.
        </p>
      </div>

      {/* Empty State */}

      {users.length === 0 && (
        <div
          className="
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            p-10
            text-center
          "
        >
          <h2 className="text-xl font-semibold">
            No Users Found
          </h2>

          <p className="mt-2 text-slate-400">
            Register a new account to get started.
          </p>
        </div>
      )}

      {/* Users Grid */}

      <div className="grid gap-6 md:grid-cols-2">

        {users.map((user) => (

          <div
            key={user.id}
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              p-6
              shadow-lg
              transition
              hover:border-blue-500
              hover:shadow-2xl
            "
          >

            <div className="space-y-2">

              <h2 className="text-2xl font-semibold">
                {user.name}
              </h2>

              <p className="text-slate-400">
                @{user.username}
              </p>

            </div>

            <div className="mt-6">

              <Link
                href={`/users/${user.username}`}
                className="
                  inline-block
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                View Profile
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}