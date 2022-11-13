import { useContext, useState } from "react";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { ErrorModal } from "../components/Modal/Modal";
import { ChangeLogoField } from "../components/Profile/ChangeLogoField/ChangeLogoField";
import { LoginChangeField } from "../components/Profile/LoginChangeField/LoginChangeField";
import { LogoNameChangeField } from "../components/Profile/LogoNameChangeField/LogoNameChangeField";
import { AuthContext } from "../context/auth-context";
import { hideChangeLogoFuncType } from "../types/componentsTypes";

const mainStyles =
  "bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-2xl grid grid-cols-12 grid-rows-6";
const sectionStyles =
  "col-start-3 col-end-11 row-start-1 row-end-7 my-20 bg-slate-300 rounded-2xl xl:col-start-4 xl:col-end-10";

export const ProfilePage = () => {
  const { isAuth, setChangeLogo, userLogo } = useContext(AuthContext);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isChangingLogo, setIsChangingLogo] = useState<boolean>(false);

  const showModalHandler = () => {
    setIsErrorModal(true);
  };

  const hideModalHandler = () => {
    setIsErrorModal(false);
  };

  const showLogoChangeHandler = () => {
    setIsChangingLogo(true);
  };

  const hideChangeLogoHandler: hideChangeLogoFuncType = (imageUrl) => {
    setIsChangingLogo(false);
    if (imageUrl === userLogo) return;
    setChangeLogo(imageUrl);
  };

  return (
    <>
      {isAuth && <Nav />}
      <main className={mainStyles}>
        <section className={sectionStyles}>
          <LogoNameChangeField
            showModalHandler={showModalHandler}
            showLogoChangeHandler={showLogoChangeHandler}
          />
          <LoginChangeField showModalHandler={showModalHandler} />
        </section>
        {isChangingLogo && (
          <ChangeLogoField hideChangeLogoHandler={hideChangeLogoHandler} />
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
