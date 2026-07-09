"use client";

import { useActionState } from "react";
import { registerUser } from "./actions";

const initialState = {
  errors: {} as {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  },

  values: {
    username: "",
    name: "",
  },
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser,
    initialState
  );

  return (
    <div className="max-w-2xl mx-auto">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-slate-400">
          Register a new account to start creating blogs.
        </p>
      </div>

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

          {state.errors.general && (
            <div
              className="
                rounded-lg
                border
                border-red-500
                bg-red-500/10
                p-3
                text-red-400
              "
            >
              {state.errors.general}
            </div>
          )}

          {/* Username */}

          <div>

            <label
              htmlFor="username"
              className="mb-2 block font-medium"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              defaultValue={state.values.username}
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

            {state.errors.username && (
              <p className="mt-2 text-red-400 text-sm">
                {state.errors.username}
              </p>
            )}

          </div>

          <div>

            <label
              htmlFor="name"
              className="mb-2 block font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={state.values.name}
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

            {state.errors.name && (
              <p className="mt-2 text-red-400 text-sm">
                {state.errors.name}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className="mb-2 block font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              className="
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-950
                px-4
                py-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
            />

            {state.errors.password && (
              <p className="mt-2 text-red-400 text-sm">
                {state.errors.password}
              </p>
            )}

          </div>


          <div>

            <label
              htmlFor="passwordConfirm"
              className="mb-2 block font-medium"
            >
              Confirm Password
            </label>

            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              className="
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-950
                px-4
                py-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
            />

            {state.errors.passwordConfirm && (
              <p className="mt-2 text-red-400 text-sm">
                {state.errors.passwordConfirm}
              </p>
            )}

          </div>


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
            Register
          </button>

        </form>
      </div>
    </div>
  );
}