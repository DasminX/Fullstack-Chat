import { FC } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";

type RegisterPageFCType = FC<{ isRegistering: boolean }>;
export const RegisterPage: RegisterPageFCType = ({ isRegistering }) => {
  return <AuthForm isRegistering={isRegistering}></AuthForm>;
};
