"use client";

import "./login.css";
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
   <div className="login-page">

    <div className="login-header">

        <h1 className="login-title">
            Login
        </h1>

        <p className="login-description">
            Welcome back! Login to continue.
        </p>

    </div>

    <div className="login-card">

        {state.error && (

            <div className="login-error">

                {state.error}

            </div>

        )}

        <form
            action={formAction}
            className="login-form"
        >

           <div className="login-group">

    <label
        htmlFor="username"
        className="login-label"
    >
        Username
    </label>

    <input
        id="username"
        name="username"
        className="login-input"
    />

</div>

          <div className="login-group">

    <label
        htmlFor="password"
        className="login-label"
    >
        Password
    </label>

    <input
        id="password"
        name="password"
        type="password"
        className="login-input"
    />

</div>

           <button
    type="submit"
    className="login-button"
>
    Login
</button>

        </form>

        <div className="login-footer">

            <p>
                Don't have an account?
            </p>

            <Link
                href="/register"
                className="register-link"
            >
                Register here
            </Link>

        </div>

    </div>

</div>
  );
}