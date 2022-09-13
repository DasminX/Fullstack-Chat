import React, { useContext, useState } from "react";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { ErrorModal } from "../components/Modal/Modal";
import { ChangeLogoField } from "../components/Profile/ChangeLogoField/ChangeLogoField";
import { LogoNameChangeField } from "../components/Profile/LogoNameChangeField/LogoNameChangeField";
import { AuthContext } from "../context/auth-context";

export const ProfilePage = () => {
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isChangingLogo, setIsChangingLogo] = useState(false);
  const authCtx = useContext(AuthContext);

  const setErrorHandler = () => {
    setIsErrorModal(true);
  };

  const hideModalHandler = () => {
    setIsErrorModal(false);
  };

  const showLogoChangeHandler = () => {
    setIsChangingLogo(true);
  };

  const hideLogoChangeHandler = (imageUrl: string) => {
    setIsChangingLogo(false);
    authCtx.setChangeLogo(imageUrl);
  };

  return (
    <>
      {authCtx.isAuth && <Nav />}
      <main className="bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-2xl grid grid-cols-12 grid-rows-6">
        <section className="col-start-3 col-end-11 row-start-1 row-end-7 my-20 bg-slate-300 rounded-2xl xl:col-start-4 xl:col-end-10">
          <LogoNameChangeField
            setErrorHandler={setErrorHandler}
            showLogoChangeHandler={showLogoChangeHandler}
          />
        </section>
        {isChangingLogo && (
          <ChangeLogoField hideLogoChangeHandler={hideLogoChangeHandler} />
        )}
        {isErrorModal && (
          <ErrorModal
            message={"Username must be between 3-12 characters long."}
            hideModalHandler={hideModalHandler}
          />
        )}
      </main>
    </>
  );
};
