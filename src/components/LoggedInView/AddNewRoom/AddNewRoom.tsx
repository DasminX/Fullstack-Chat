import { FormEvent, useContext, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import { AuthContext } from "../../../context/auth-context";
import { ChatContext } from "../../../context/chat-context";
import { AddNewRoomFCType } from "../../../types/componentsTypes";
import { AuthContextType } from "../../../types/authContextTypes";
import { ChatContextType } from "../../../types/chatContextTypes";
import { AddRoomFormControl } from "./AddRoomFormControl/AddRoomFormControl";

const formStyles =
  "col-start-6 col-span-3 row-start-2 row-span-3 rounded-2xl p-4 bg-slate-200 flex flex-col";

const closeFormButton =
  "text-slate-500 ml-auto text-4xl font-bold cursor-pointer hover:text-black";

const buttonWrapperStyles = "w-full basis-full flex flex-col-reverse";

const inputFields = [
  { labelText: "Enter room name:", htmlForID: "roomName", type: "text" },
  { labelText: "Enter room logo URL:", htmlForID: "roomURL", type: "text" },
  { labelText: "Private room:", htmlForID: "private/public", type: "checkbox" },
  {
    labelText: "Enter private's room password:",
    htmlForID: "roomPassword",
    type: "password",
  },
];

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
      {inputFields.map((el) => (
        <AddRoomFormControl
          isCheckboxChecked={isCheckboxChecked}
          isPasswordShown={isPasswordShown}
          labelText={el.labelText}
          htmlForID={el.htmlForID}
          type={el.type}
          onChangeCheckboxHandler={
            el.type === "checkbox" ? onChangeCheckboxHandler : undefined
          }
          toggleShowPasswordHandler={
            el.htmlForID === "roomPassword"
              ? toggleShowPasswordHandler
              : undefined
          }
        />
      ))}
      <div className={buttonWrapperStyles}>
        <Button type="submit" customClasses="w-3/5 mb-6">
          Create a room!
        </Button>
      </div>
    </form>
  );
};
