import { FC, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Button } from "../Button/Button";

export const LogoNameChangeField: FC<{
  setErrorHandler: () => void;
  showLogoChangeHandler: () => void;
}> = ({ setErrorHandler, showLogoChangeHandler }) => {
  const [isChangingName, setIsChangingName] = useState(false);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const saveChangingNameHandler = () => {
    if (
      inputNameRef.current!.value.length < 3 ||
      inputNameRef.current!.value.length > 12
    ) {
      return setErrorHandler();
    }
    authCtx.setChangeUsername(inputNameRef.current!.value);
    setIsChangingName(false);
  };

  const changeNameHandler = () => {
    setIsChangingName(true);
  };

  return (
    <div className="user-info w-full h-32 rounded-t-2xl flex px-8 py-4 border-b-2 border-cyan-700">
      <div className="user-image basis-1/4 h-full flex justify-center items-center">
        <div className="w-20 h-20">
          <img
            className="object-cover rounded-full cursor-pointer"
            src={authCtx.userLogo}
            alt="profileimg"
            onClick={showLogoChangeHandler}
          />
        </div>
      </div>
      <div className="basis-1/2 flex items-center justify-center">
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
        <Button customClasses="grow" onClick={saveChangingNameHandler}>
          Change!
        </Button>
      )}
    </div>
  );
};
