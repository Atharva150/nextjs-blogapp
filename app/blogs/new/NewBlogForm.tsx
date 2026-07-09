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
    url: "",
  },
};

export default function NewBlogForm() {
  const [state, formAction] = useActionState(
    createBlogAction,
    initialState
  );

  return (
    <div className="blog-form-card">

      <form
        action={formAction}
        className="blog-form"
      >

        {state.errors.general && (
          <div className="form-error">
            {state.errors.general}
          </div>
        )}

        {/* Title */}

        <div className="form-group">

          <label
            htmlFor="title"
            className="form-label"
          >
            Blog Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values.title}
            placeholder="Understanding React Server Components"
            className="form-input"
          />

          {state.errors.title && (
            <p className="input-error">
              {state.errors.title}
            </p>
          )}

        </div>

        {/* Author */}

        <div className="form-group">

          <label
            htmlFor="author"
            className="form-label"
          >
            Author
          </label>

          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values.author}
            placeholder="John Doe"
            className="form-input"
          />

          {state.errors.author && (
            <p className="input-error">
              {state.errors.author}
            </p>
          )}

        </div>

        {/* URL */}

        <div className="form-group">

          <label
            htmlFor="url"
            className="form-label"
          >
            Blog URL
          </label>

          <input
            id="url"
            name="url"
            type="url"
            defaultValue={state.values.url}
            placeholder="https://example.com"
            className="form-input"
          />

          {state.errors.url && (
            <p className="input-error">
              {state.errors.url}
            </p>
          )}

        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Create Blog
        </button>

      </form>

    </div>
  );
}