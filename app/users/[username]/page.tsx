import { notFound } from "next/navigation";
import Link from "next/link";

import { getUser } from "@/app/lib/userService";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserPage({
  params,
}: Props) {
  const { username } = await params;

  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-8
        "
      >
        <h1 className="text-4xl font-bold">
          {user.name}
        </h1>

        <p className="mt-2 text-slate-400">
          @{user.username}
        </p>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Blogs
          </h2>

          {user.blogs.length === 0 ? (
            <p className="text-slate-400">
              This user hasn't created any blogs yet.
            </p>
          ) : (
            <div className="space-y-4">
              {user.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-950
                    p-5
                  "
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="
                      text-xl
                      font-semibold
                      text-blue-400
                      hover:underline
                    "
                  >
                    {blog.title}
                  </Link>

                  <p className="mt-2 text-slate-400">
                    👍 {blog.likes} Likes
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}