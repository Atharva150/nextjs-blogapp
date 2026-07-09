import { notFound } from "next/navigation";
import { getBlog } from "@/app/lib/blogService";
import { likeBlogAction } from "@/app/actions/blogActions";

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

  return (
    <div className="max-w-4xl mx-auto">

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


        <p className="mt-3 text-lg text-slate-400">
          By{" "}
          <span className="font-medium text-slate-200">
            {blog.user?.name}
          </span>
        </p>

        {/* Divider */}

        <div className="my-8 border-t border-slate-800"></div>

        {/* URL */}

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
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
            <h2 className="text-xl font-semibold">
              Likes
            </h2>

            <p className="mt-2 text-2xl font-bold text-blue-400">
              👍 {blog.likes}
            </p>
          </div>

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
              👍 Like Blog
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}