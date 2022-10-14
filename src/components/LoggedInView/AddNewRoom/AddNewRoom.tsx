import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useRef, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../Button/Button";
import { AuthContext } from "../../../context/auth-context";
import { ChatContext } from "../../../context/chat-context";
import { AddNewRoomFCType } from "../../../types/componentsTypes";
import { AuthContextType } from "../../../types/authContextTypes";
import { ChatContextType } from "../../../types/chatContextTypes";

const formStyles =
  "col-start-6 col-span-3 row-start-2 row-span-3 rounded-2xl p-4 bg-slate-200 flex flex-col";

const closeFormButton =
  "text-slate-500 ml-auto text-4xl font-bold cursor-pointer hover:text-black";

const formControlStyles =
  "relative bg-white w-full h-auto p-3 flex justify-between text-black border-2 border-cyan-700 rounded-md my-4";

const labelTextStyles = "flex items-center justify-center ";

const inputTextStyles = "border-2 border-black rounded-xl px-2 py-1";

const checkboxStyles = "basis-1/2";

const eyeIconStyles = "self-center ml-2 cursor-pointer";
const buttonWrapperStyles = "w-full basis-full flex flex-col-reverse";

export const AddNewRoom: AddNewRoomFCType = ({
  closeAddingRoomFieldHandler,
}) => {
  const { socket } = useContext<AuthContextType>(AuthContext);
  const { switchLoader } = useContext<ChatContextType>(ChatContext);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const URLInputRef = useRef<HTMLInputElement>(null);
  const isPrivateCheckboxRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const createRoomHandler = (e: FormEvent) => {
    e.preventDefault();

    if (socket === null || !nameInputRef.current) return;

    switchLoader(true);

    socket.emit("roomAdded", {
      name: nameInputRef.current.value,
      logoURL:
        URLInputRef.current?.value ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
      isPrivate: isPrivateCheckboxRef.current?.checked || false,
      roomPassword: passwordInputRef.current?.value || "",
    });

    closeAddingRoomFieldHandler();
  };

  const onChangeCheckboxHandler = () => {
    setIsCheckboxChecked((prevCheckboxValue) => !prevCheckboxValue);
  };

  const toggleShowPasswordHandler = () => {
    setIsPasswordShown((PrevPasswordShownValue) => !PrevPasswordShownValue);
  };

  return (
    <form className={formStyles} onSubmit={createRoomHandler}>
      <div className={closeFormButton} onClick={closeAddingRoomFieldHandler}>
        &times;
      </div>
      <div className={`form-control ${formControlStyles}`}>
        <label className={labelTextStyles} htmlFor="roomName">
          Enter room name:
        </label>
        <input
          ref={nameInputRef}
          className={inputTextStyles}
          type="text"
          id="roomName"
        />
      </div>
      <div className={`form-control ${formControlStyles}`}>
        <label className={labelTextStyles} htmlFor="roomURL">
          Enter room logo URL:
        </label>
        <input
          ref={URLInputRef}
          className={inputTextStyles}
          type="text"
          id="roomURL"
        />
      </div>
      <div className={`form-control ${formControlStyles}`}>
        <label className={labelTextStyles} htmlFor="private/public">
          Private room:
        </label>
        <input
          ref={isPrivateCheckboxRef}
          type="checkbox"
          id="private/public"
          className={checkboxStyles}
          onChange={onChangeCheckboxHandler}
        />
      </div>
      {isCheckboxChecked && (
        <div className={`form-control ${formControlStyles}`}>
          <label className={labelTextStyles} htmlFor="roomPassword">
            Enter private's room password:
          </label>
          <input
            ref={passwordInputRef}
            className={`${inputTextStyles}`}
            type={isPasswordShown ? "text" : "password"}
            id="roomPassword"
          />
          <FontAwesomeIcon
            icon={faEye}
            className={eyeIconStyles}
            onClick={toggleShowPasswordHandler}
          />
        </div>
      )}
      <div className={buttonWrapperStyles}>
        <Button type="submit" customClasses="w-3/5 mb-6">
          Create a room!
        </Button>
      </div>
    </form>
  );
};
