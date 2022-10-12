import { AuthForm } from "../components/AuthForm/AuthForm";
import { RegisterPageFCType } from "../types/componentsTypes";

export const RegisterPage: RegisterPageFCType = ({ isRegistering }) => {
  return <AuthForm isRegistering={isRegistering}></AuthForm>;
};
