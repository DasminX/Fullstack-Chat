import React, { FC, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { AuthFormInput } from "./AuthFormInput";

export const AuthForm: FC<{ isRegistering: boolean }> = ({ isRegistering }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const formActionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (isRegistering) {
      return navigate("/login");
    }
    authCtx.login(true);
    return navigate("/chat");
  };

  return (
    <main className="relative h-screen w-full flex justify-center items-center bg-slate-800">
      <form
        onSubmit={formActionHandler}
        className="bg-transparent/25 h-2/3 w-1/3 rounded-xl shadow-indigo-400 shadow-2xl border-solid border-indigo-300 border-2 font-semibold leading-8 p-10 flex flex-col justify-around text-center"
      >
        <h1 className="text-3xl py-6">
          {isRegistering ? "Register" : "Sign in to join chat lobby!"}
        </h1>
        <AuthFormInput inputName={"Login"} inputType={"text"} />
        <AuthFormInput inputName={"Password"} inputType={"password"} />
        {isRegistering && (
          <AuthFormInput inputName={"Repeat Password"} inputType={"password"} />
        )}
        <div className="w-full my-14">
          <button
            className="bg-slate-600 px-8 py-2 rounded-lg w-1/3 hover:scale-110 hover:bg-slate-500 transition duration-150"
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
            className="text-indigo-400 hover:text-indigo-300"
          >
            HERE
          </NavLink>
          {isRegistering ? " to sign in." : " to register."}
        </p>
      </form>
    </main>
  );
};
