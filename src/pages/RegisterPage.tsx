import { FC } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";

export const RegisterPage: FC<{ isRegistering: boolean }> = ({
  isRegistering,
}) => {
  return <AuthForm isRegistering={isRegistering}></AuthForm>;
};
