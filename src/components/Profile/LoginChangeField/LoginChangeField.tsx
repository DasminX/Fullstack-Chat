import { FC, useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { AuthContextType } from "../../../types/authContextTypes";
import { Button } from "../../Button/Button";

const sectionStyles =
  "user-info w-full h-32 rounded-t-2xl flex px-8 py-4 border-b-2 border-cyan-700";
const changeNameAreaWrapperStyles =
  "basis-1/2 flex items-center justify-center";

let temporaryName = "";

export const LoginChangeField: FC<{ showModalHandler: () => void }> = ({
  showModalHandler,
}) => {
  const [isChangingLogin, setIsChangingLogin] = useState<boolean>(false);
  const loginInputRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext<AuthContextType>(AuthContext);

  const changeLoginHandler = () => {
    temporaryName = loginInputRef.current!.value || "";
    setIsChangingLogin(true);
  };

  const saveChangingLogoHandler = () => {
    if (!loginInputRef.current) return;
    if (
      loginInputRef.current.value.length < 8 ||
      loginInputRef.current.value.length > 20
    ) {
      return showModalHandler();
    }

    temporaryName = "";
    authCtx.changeUsernameHandler(loginInputRef.current.value, true);
    setIsChangingLogin(false);
  };

  const cancelChangingLoginHandler = () => {
    if (!loginInputRef.current) return;
    setIsChangingLogin(false);
    loginInputRef.current.value = temporaryName;
  };

  return (
    <section className={sectionStyles}>
      <div className={changeNameAreaWrapperStyles}>
        <input
          type="text"
          ref={loginInputRef}
          defaultValue={authCtx.username}
          className={`${
            isChangingLogin
              ? "bg-white border-2 border-black"
              : "bg-transparent"
          } rounded-md px-2 py-1`}
          onFocus={changeLoginHandler}
        />
      </div>
      {isChangingLogin && (
        <Button customClasses="grow mx-4" onClick={saveChangingLogoHandler}>
          Change!
        </Button>
      )}
      {isChangingLogin && (
        <Button
          customClasses="py-1 px-4 border-cyan-700 border-2 bg-slate-200 text-black hover:text-white"
          onClick={cancelChangingLoginHandler}
        >
          &times;
        </Button>
      )}
    </section>
  );
};
