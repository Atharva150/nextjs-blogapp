import { createBlog } from "@/app/lib/actions";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Create Blog
      </h1>

      <form
        action={createBlog}
        className="flex flex-col gap-4 max-w-md"
      >
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded"
        />

        <input
          name="author"
          placeholder="Author"
          className="border p-2 rounded"
        />

        <input
          name="url"
          placeholder="URL"
          className="border p-2 rounded"
        />

        <button
          className="bg-blue-600 text-white rounded p-2"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}