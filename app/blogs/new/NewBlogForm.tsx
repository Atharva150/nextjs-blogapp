"use client";

import { useActionState } from "react";
import { createBlogAction } from "@/app/actions/blogActions";

const initialState = {
  errors: {} as {
    title?: string;
    author?: string;
    url?: string;
    general?: string;
  },

  values: {
    title: "",
    author: "",
    url: ""
  },
};

export default function NewBlogForm() {
  const [state, formAction] = useActionState(
    createBlogAction,
    initialState
  );

  return (
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
      <form
        action={formAction}
        className="space-y-6"
      >
        {/* General Error */}

        {/* {state.errors.general && (
          <div
            className="
              rounded-lg
              border
              border-red-500
              bg-red-500/10
              p-4
              text-red-400
            "
          >
            {state.errors.general}
          </div> */}
        {/* )} */}

        {/* Title */}

        <div>
          <label
            htmlFor="title"
            className="mb-2 block font-medium"
          >
            Blog Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values.title}
            placeholder="Understanding React Server Components"
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-950
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:border-blue-500
              focus:outline-none
            "
          />

          {state.errors.title && (
            <p className="mt-2 text-sm text-red-400">
              {state.errors.title}
            </p>
          )}
        </div>

        {/* Author */}

        <div>
          <label
            htmlFor="author"
            className="mb-2 block font-medium"
          >
            Author
          </label>

          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values.author}
            placeholder="John Doe"
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-950
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:border-blue-500
              focus:outline-none
            "
          />

          {state.errors.author && (
            <p className="mt-2 text-sm text-red-400">
              {state.errors.author}
            </p>
          )}
        </div>

        {/* URL */}

        <div>
          <label
            htmlFor="url"
            className="mb-2 block font-medium"
          >
            Blog URL
          </label>

          <input
            id="url"
            name="url"
            type="url"
            defaultValue={state.values.url}
            placeholder="https://example.com"
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-950
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:border-blue-500
              focus:outline-none
            "
          />

          {state.errors.url && (
            <p className="mt-2 text-sm text-red-400">
              {state.errors.url}
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="
            w-full
            rounded-lg
            bg-blue-600
            py-3
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}