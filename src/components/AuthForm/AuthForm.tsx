import React, { FC, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { AuthFormInput } from "./AuthFormInput";

export const AuthForm: FC<{ isRegistering: boolean }> = ({ isRegistering }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const formActionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegistering) {
      if (
        repeatPasswordInputRef.current!.value !==
        passwordInputRef.current!.value
      )
        return console.log("hasla nie sa takie same");

      fetch("http://localhost:3008/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          login: loginInputRef.current!.value,
          password: passwordInputRef.current!.value,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === "error")
            return console.log(resData.data.message);
          return navigate("/login");
        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:3008/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          login: loginInputRef.current!.value,
          password: passwordInputRef.current!.value,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === "error")
            return console.log(resData.data.message);

          const {
            token,
            user: { username },
          } = resData.data;

          authCtx.login(token);
          authCtx.setChangeUsername(username);

          return navigate("/chat");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="relative h-screen w-full flex justify-center items-center bg-slate-900 text-white">
      <form
        onSubmit={formActionHandler}
        className="bg-transparent/25 h-2/3 w-1/3 rounded-xl shadow-cyan-400 shadow-2xl border-solid border-indigo-300 border-2 font-semibold leading-8 p-10 flex flex-col justify-around text-center"
      >
        <h1 className="text-3xl py-6">
          {isRegistering ? "Register" : "Sign in to join chat lobby!"}
        </h1>
        <AuthFormInput
          ref={loginInputRef}
          inputName={"Login"}
          inputType={"text"}
        />
        <AuthFormInput
          ref={passwordInputRef}
          inputName={"Password"}
          inputType={"password"}
        />
        {isRegistering && (
          <AuthFormInput
            ref={repeatPasswordInputRef}
            inputName={"Repeat Password"}
            inputType={"password"}
          />
        )}
        <div className="w-full my-14">
          <button
            className="bg-slate-700 px-8 py-2 rounded-lg w-1/3 hover:scale-110 hover:bg-cyan-700 transition duration-150"
            type="submit"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </div>
        <p>
          {isRegistering
            ? "You have an account already? Click "
            : "Not having an account yet? Click "}
          <NavLink
            to={`${isRegistering ? "/login" : "/register"}`}
            className="text-cyan-700 hover:text-cyan-400"
          >
            HERE
          </NavLink>
          {isRegistering ? " to sign in." : " to register."}
        </p>
      </form>
    </main>
  );
};
