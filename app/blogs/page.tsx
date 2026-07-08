import Link from "next/link";
import { blogs } from "../lib/blogs";

interface BlogsPageProps {
  searchParams: Promise<{
    filter?: string;
  }>;
}

export default async function BlogsPage({
  searchParams,
}: BlogsPageProps) {
  const { filter = "" } = await searchParams;

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => b.likes - a.likes
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Blogs
      </h1>

      {/* Search Form */}
      <form
        action="/blogs"
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search by title"
          className="border rounded p-2 flex-1"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded"
        >
          Search
        </button>
      </form>

      {/* New Blog Button */}
      <div className="mb-6">
        <Link
          href="/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Blog
        </Link>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {sortedBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          sortedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg p-4 shadow"
            >
              <h2 className="text-xl font-semibold">
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>

              <p>Author: {blog.author}</p>

              <p>Likes: {blog.likes}</p>

              <Link
                href={blog.url}
                className="text-blue-600 underline"
              >
                Visit Blog
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}