import { AuthForm } from "../components/AuthForm/AuthForm";
import { LoginPageFCType } from "../types/componentsTypes";

export const LoginPage: LoginPageFCType = ({ isRegistering }) => {
  return <AuthForm isRegistering={isRegistering}></AuthForm>;
};
