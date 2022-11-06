import { useState } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { ErrorModal } from "../components/Modal/Modal";
import { AuthPageFCType } from "../types/componentsTypes";

export const AuthPage: AuthPageFCType = ({ isRegistering }) => {
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const showModalHandler = (errMsg: string) => {
    setErrorMessage(errMsg);
    setIsErrorModal(true);
  };

  const hideModalHandler = () => {
    setIsErrorModal(false);
  };

  return (
    <>
      <AuthForm
        isRegistering={isRegistering}
        showModalHandler={showModalHandler}
      ></AuthForm>
      ;
      {isErrorModal && (
        <ErrorModal
          message={errorMessage}
          hideModalHandler={hideModalHandler}
        />
      )}
    </>
  );
};
