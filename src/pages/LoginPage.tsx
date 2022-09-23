import { FC } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";

type LoginPageFCType = FC<{ isRegistering: boolean }>;

export const LoginPage: LoginPageFCType = ({ isRegistering }) => {
  return <AuthForm isRegistering={isRegistering}></AuthForm>;
};
