import Link from "next/link";
import { getBlogs } from "../lib/blogService";
import { auth } from "@/auth";

interface BlogsPageProps {
  searchParams: Promise<{
    filter?: string;
  }>;
}

export default async function BlogsPage({
  searchParams,
}: BlogsPageProps) {
  const blogs = await getBlogs();
  const session = await auth();

  const { filter = "" } = await searchParams;

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Blogs
          </h1>

          <p className="mt-2 text-slate-400">
            Browse and discover blogs created by users.
          </p>
        </div>

        {session && (
    <Link
        href="/blogs/new"
        className="..."
    >
        + New Blog
    </Link>
)}

      </div>

      {/* Search */}

      <form
        action="/blogs"
        className="flex gap-3"
      >
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search blogs..."
          className="
            flex-1
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-white
            placeholder:text-slate-500
            focus:border-blue-500
            focus:outline-none
          "
        />

        <button
          type="submit"
          className="
            rounded-lg
            bg-green-600
            px-6
            text-white
            transition
            hover:bg-green-700
          "
        >
          Search
        </button>
      </form>

      {/* Empty State */}

      {filteredBlogs.length === 0 && (
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
            No Blogs Found
          </h2>

          <p className="mt-2 text-slate-400">
            Try another search or create a new blog.
          </p>
        </div>
      )}

      {/* Blog Cards */}

      <div className="grid gap-6">

        {filteredBlogs.map((blog) => (

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
              hover:shadow-2xl
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="
                    text-2xl
                    font-bold
                    text-white
                    transition
                    hover:text-blue-400
                  "
                >
                  {blog.title}
                </Link>

                <p className="mt-2 text-slate-400">
                  By {blog.author}
                </p>

              </div>

              <span
                className="
                  rounded-full
                  bg-blue-600/20
                  px-3
                  py-1
                  text-sm
                  text-blue-300
                "
              >
                👍 {blog.likes}
              </span>

            </div>

            <div className="mt-5">

              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-blue-400
                  hover:underline
                "
              >
                {blog.url}
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}