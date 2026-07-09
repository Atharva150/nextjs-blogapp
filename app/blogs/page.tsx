import Link from "next/link";
import { getBlogs } from "../lib/blogService";
import { auth } from "@/auth";
import "./blogs.css";

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
    blog.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="blogs-page">

      <div className="blogs-header">

        <div className="blogs-header-left">
          <h1>Blogs</h1>

          <p>
            Browse and discover blogs created by users.
          </p>
        </div>

        {session && (
          <Link
            href="/blogs/new"
            className="new-blog-btn"
          >
            + New Blog
          </Link>
        )}

      </div>

      <form
        action="/blogs"
        className="search-form"
      >
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search blogs..."
          className="search-input"
        />

        <button
          type="submit"
          className="search-btn"
        >
          Search
        </button>

      </form>

      {filteredBlogs.length === 0 && (

        <div className="empty-state">

          <h2>No Blogs Found</h2>

          <p>
            Try another search or create a new blog.
          </p>

        </div>

      )}

      <div className="blogs-list">

        {filteredBlogs.map((blog) => (

          <div
            key={blog.id}
            className="blog-card"
          >

            <div className="blog-card-top">

              <div>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="blog-title"
                >
                  {blog.title}
                </Link>

                <p className="blog-author">
                  By {blog.author}
                </p>

              </div>

              <span className="likes-badge">
                👍 {blog.likes}
              </span>

            </div>

            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-url"
            >
              {blog.url}
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}