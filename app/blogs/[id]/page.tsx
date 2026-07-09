import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";

import {
  getBlog,
} from "@/app/lib/blogService";

import {
  likeBlogAction,
  deleteBlogAction,
} from "@/app/actions/blogActions";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { id } = await params;

  const blog = await getBlog(Number(id));

  if (!blog) {
    notFound();
  }

  const session = await auth();

  const canDelete =
    session?.user &&
    Number(session.user.id) === blog.userId;

  return (
    <div className="mx-auto max-w-4xl">

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
        {/* Title */}

        <h1 className="text-4xl font-bold text-white">
          {blog.title}
        </h1>

        {/* Author */}

        <p className="mt-3 text-lg text-slate-400">
          Added by{" "}

          {blog.user ? (
            <Link
              href={`/users/${blog.user.username}`}
              className="
                font-medium
                text-blue-400
                hover:underline
              "
            >
              {blog.user.name}
            </Link>
          ) : (
            <span className="font-medium text-slate-200">
              Unknown User
            </span>
          )}
        </p>

        {/* Divider */}

        <div className="my-8 border-t border-slate-800"></div>

        {/* URL */}

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            Blog URL
          </h2>

          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              break-all
              text-blue-400
              hover:underline
            "
          >
            {blog.url}
          </a>
        </div>

        {/* Likes */}

        <div className="mt-8 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Likes
            </h2>

            <p className="mt-2 text-2xl font-bold text-blue-400">
              👍 {blog.likes}
            </p>
          </div>

          <div className="flex gap-3">

            {/* Like Button */}

            <form action={likeBlogAction}>
              <input
                type="hidden"
                name="id"
                value={blog.id}
              />

              <button
                type="submit"
                className="
                  rounded-lg
                  bg-blue-600
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                👍 Like
              </button>
            </form>

            {/* Delete Button */}

            {canDelete && (
              <form action={deleteBlogAction}>
                <input
                  type="hidden"
                  name="id"
                  value={blog.id}
                />

                <button
                  type="submit"
                  className="
                    rounded-lg
                    bg-red-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  🗑 Delete
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}