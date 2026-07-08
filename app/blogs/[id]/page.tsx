import { blogs } from "@/app/lib/blogs";
import { notFound } from "next/navigation";
import { likeBlog } from "@/app/lib/actions";

interface BlogPageProps {
  params:Promise<{
    id: string;
  }>;
}

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { id } = await params;

  const blog = blogs.find(
      (b) => b.id === Number(id)
    );
    
      return (
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            {blog!.title}
          </h1>
    
          <p>
            <strong>Author:</strong> {blog!.author}
          </p>
    
          <p>
            <strong>URL:</strong>
          </p>
    
          <a
            href={blog!.url}
            className="text-blue-600 underline"
          >
            {blog!.url}
          </a>
    
          <p>
            <strong>Likes:</strong> {blog!.likes}
          </p>
          <form action={likeBlog}>
  <input
    type="hidden"
    name="id"
    value={blog!.id}
  />

  <button className="bg-pink-600 text-white px-4 py-2 rounded mt-4">
    ❤️ Like
  </button>
</form>
        </div>
      );
}