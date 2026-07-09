"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginAction } from "./actions";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction] =
    useActionState(
      loginAction,
      initialState
    );

  return (
    <div className="max-w-lg mx-auto">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Login to continue.
        </p>

      </div>

      {/* Card */}

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

        {state.error && (
          <div
            className="
              mb-6
              rounded-lg
              border
              border-red-500
              bg-red-500/10
              p-3
              text-red-400
            "
          >
            {state.error}
          </div>
        )}

        <form
          action={formAction}
          className="space-y-6"
        >

          <div>

            <label
              htmlFor="username"
              className="block mb-2"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              required
              className="
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-950
                p-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
            />

          </div>

          <div>

            <label
              htmlFor="password"
              className="block mb-2"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              className="
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-950
                p-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-lg
              bg-blue-600
              py-3
              font-semibold
              transition
              hover:bg-blue-700
            "
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-slate-400">
            Don't have an account?
          </p>

          <Link
            href="/register"
            className="
              mt-2
              inline-block
              text-blue-400
              hover:underline
            "
          >
            Register here
          </Link>

        </div>

      </div>

    </div>
  );
}