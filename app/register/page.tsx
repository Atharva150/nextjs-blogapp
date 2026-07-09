"use client";
import "./register.css";

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
   <div className="register-page">

    <div className="register-header">

        <h1 className="register-title">
            Create Account
        </h1>

        <p className="register-description">
            Register a new account to start creating blogs.
        </p>

    </div>

    <div className="register-card">

        <form
            action={formAction}
            className="register-form"
        >

            {state.errors.general && (

                <div className="form-error">

                    {state.errors.general}

                </div>

            )}

            <div className="form-group">

                <label
                    htmlFor="username"
                    className="form-label"
                >
                    Username
                </label>

                <input
                    id="username"
                    name="username"
                    className="form-input"
                    defaultValue={state.values.username}
                />

                {state.errors.username && (

                    <p className="input-error">

                        {state.errors.username}

                    </p>

                )}

            </div>

            <div className="form-group">

                <label
                    htmlFor="name"
                    className="form-label"
                >
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                    className="form-input"
                    defaultValue={state.values.name}
                />

                {state.errors.name && (

                    <p className="input-error">

                        {state.errors.name}

                    </p>

                )}

            </div>

            <div className="form-group">

                <label
                    htmlFor="password"
                    className="form-label"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-input"
                />

                {state.errors.password && (

                    <p className="input-error">

                        {state.errors.password}

                    </p>

                )}

            </div>

            <div className="form-group">

                <label
                    htmlFor="passwordConfirm"
                    className="form-label"
                >
                    Confirm Password
                </label>

                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    className="form-input"
                />

                {state.errors.passwordConfirm && (

                    <p className="input-error">

                        {state.errors.passwordConfirm}

                    </p>

                )}

            </div>

            <button
                className="submit-button"
                type="submit"
            >
                Register
            </button>

        </form>

    </div>

</div>
  );
}