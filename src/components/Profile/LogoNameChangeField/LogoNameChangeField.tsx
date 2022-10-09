import React from "react";
import { FC, useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { Button } from "../../Button/Button";

const sectionStyles =
  "user-info w-full h-32 rounded-t-2xl flex px-8 py-4 border-b-2 border-cyan-700";
const logoAreaWrapperStyles =
  "user-image basis-1/4 h-full flex justify-center items-center";
const changeNameAreaWrapperStyles =
  "basis-1/2 flex items-center justify-center";

let temporaryName = "";

type LogoNameChangeFieldFCType = FC<{
  showModalHandler: () => void;
  showLogoChangeHandler: () => void;
}>;

export const LogoNameChangeField: LogoNameChangeFieldFCType = ({
  showModalHandler,
  showLogoChangeHandler,
}) => {
  const [isChangingName, setIsChangingName] = useState<boolean>(false);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const changeNameHandler = () => {
    temporaryName = inputNameRef.current!.value || "";
    setIsChangingName(true);
  };

  const saveChangingNameHandler = () => {
    if (
      inputNameRef.current!.value.length < 3 ||
      inputNameRef.current!.value.length > 12
    ) {
      return showModalHandler();
    }
    temporaryName = "";
    authCtx.changeUsernameHandler(inputNameRef.current!.value, true);
    setIsChangingName(false);
  };

  const cancelChangingNameHandler = () => {
    setIsChangingName(false);
    inputNameRef.current!.value = temporaryName;
  };

  return (
    <section className={sectionStyles}>
      <div className={logoAreaWrapperStyles}>
        <div className="w-20 h-20">
          <img
            className="object-cover rounded-full cursor-pointer"
            src={authCtx.userLogo}
            alt="profileimg"
            onClick={showLogoChangeHandler}
          />
        </div>
      </div>
      <div className={changeNameAreaWrapperStyles}>
        <input
          type="text"
          ref={inputNameRef}
          defaultValue={authCtx.username}
          className={`${
            isChangingName ? "bg-white border-2 border-black" : "bg-transparent"
          } rounded-md px-2 py-1`}
          onFocus={changeNameHandler}
        />
      </div>
      {isChangingName && (
        <Button customClasses="grow mx-4" onClick={saveChangingNameHandler}>
          Change!
        </Button>
      )}
      {isChangingName && (
        <Button
          customClasses="py-1 px-4 border-cyan-700 border-2 bg-slate-200 text-black hover:text-white"
          onClick={cancelChangingNameHandler}
        >
          &times;
        </Button>
      )}
    </section>
  );
};
