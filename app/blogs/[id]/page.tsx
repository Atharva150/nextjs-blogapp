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
    !!session?.user?.id &&
    Number(session.user.id) === blog.userId;

  return (
   <div className="blog-details-page">

    <div className="blog-details-card">

        <h1 className="blog-title">
            {blog.title}
        </h1>

        <p className="blog-author">

            Added by{" "}

            {blog.user ? (

                <Link
                    href={`/users/${blog.user.username}`}
                    className="author-link"
                >
                    {blog.user.name}
                </Link>

            ) : (

                <span className="unknown-author">
                    Unknown User
                </span>

            )}

        </p>

        <div className="blog-divider"></div>

        <div className="blog-url-section">

            <h2 className="section-title">
                Blog URL
            </h2>

            <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-url-link"
            >
                {blog.url}
            </a>

        </div>

        <div className="blog-actions">

            <div className="likes-box">

                <h2 className="section-title">
                    Likes
                </h2>

                <p className="likes-count">
                    👍 {blog.likes}
                </p>

            </div>

            <div className="buttons-group">

                <form action={likeBlogAction}>

                    <input
                        type="hidden"
                        name="id"
                        value={blog.id}
                    />

                    <button
                        className="like-button"
                        type="submit"
                    >
                        👍 Like
                    </button>

                </form>

                {canDelete && (

                    <form action={deleteBlogAction}>

                        <input
                            type="hidden"
                            name="id"
                            value={blog.id}
                        />

                        <button
                            className="delete-button"
                            type="submit"
                            onClick={(e)=>{
                                if(!confirm("Delete this blog?")){
                                    e.preventDefault();
                                }
                            }}
                        >
                            Delete Blog
                        </button>

                    </form>

                )}

            </div>

        </div>

    </div>

</div>
  );
}