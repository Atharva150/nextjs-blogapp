import Link from "next/link";
import { notFound } from "next/navigation";

import { getUser } from "@/app/lib/userService";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserPage({
  params,
}: UserPageProps) {
  const { username } = await params;

  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}

      <div
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-8
          shadow-xl
        "
      >
        <h1 className="text-4xl font-bold">
          {user.name}
        </h1>

        <p className="mt-2 text-slate-400">
          @{user.username}
        </p>

        <div className="mt-6 flex gap-3">

          <span
            className="
              rounded-full
              bg-blue-600/20
              px-4
              py-2
              text-blue-300
            "
          >
            Blogs Added: {user.blogs.length}
          </span>

        </div>
      </div>

      {/* Blog Section */}

      <div>

        <h2 className="mb-6 text-3xl font-bold">
          Blogs
        </h2>

        {user.blogs.length === 0 ? (

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
            <p className="text-slate-400">
              This user hasn't added any blogs yet.
            </p>
          </div>

        ) : (

          <div className="space-y-5">

            {user.blogs.map((blog) => (

              <div
                key={blog.id}
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-6
                  shadow-lg
                  transition
                  hover:border-blue-500
                "
              >
                <div className="flex items-start justify-between">

                  <div>

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="
                        text-2xl
                        font-semibold
                        hover:text-blue-400
                      "
                    >
                      {blog.title}
                    </Link>

                    <p className="mt-2 text-slate-400">
                      {blog.author}
                    </p>

                  </div>

                  <span
                    className="
                      rounded-full
                      bg-green-600/20
                      px-3
                      py-1
                      text-green-300
                    "
                  >
                    👍 {blog.likes}
                  </span>

                </div>

                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4
                    block
                    break-all
                    text-blue-400
                    hover:underline
                  "
                >
                  {blog.url}
                </a>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}