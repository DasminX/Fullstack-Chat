import { Grid } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { ErrorModal } from "../components/Modal/Modal";
import { ChangeLogoField } from "../components/Profile/ChangeLogoField/ChangeLogoField";
import { LoginChangeField } from "../components/Profile/LoginChangeField/LoginChangeField";
import { LogoNameChangeField } from "../components/Profile/LogoNameChangeField/LogoNameChangeField";
import { AuthContext } from "../context/auth-context";
import { hideChangeLogoFuncType } from "../types/componentsTypes";

export const ProfilePage = () => {
  const { isAuth, setChangeLogo } = useContext(AuthContext);
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
    setChangeLogo(imageUrl);
  };

  return (
    <>
      {isAuth && <Nav />}
      <Grid
        className={"bg-slate-900 grid-cols-12 grid-rows-6"}
        as="main"
        h={"calc(100vh - 3.5rem)"}
        w={"full"}
        fontSize={"2xl"}
      >
        <Grid
          className={"bg-slate-300"}
          as={"section"}
          gridColumnStart={3}
          gridColumnEnd={11}
          gridRowStart={1}
          gridRowEnd={7}
          my={20}
          rounded={"2xl"}
        >
          <LogoNameChangeField
            showModalHandler={showModalHandler}
            showLogoChangeHandler={showLogoChangeHandler}
          />
          <LoginChangeField showModalHandler={showModalHandler} />
        </Grid>
        {isChangingLogo && (
          <ChangeLogoField hideChangeLogoHandler={hideChangeLogoHandler} />
        )}
        {isErrorModal && (
          <ErrorModal
            message={"Username must be between 3-12 characters long."}
            hideModalHandler={hideModalHandler}
          />
        )}
      </Grid>
    </>
  );
};
