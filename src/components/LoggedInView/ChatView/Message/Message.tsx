import { FC, useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";

import { avatars, AvatarType } from "../../../../utils/avatars";

const imgWrapperStyles = "h-auto w-1/12 min-w-1/12 ";
const imgStyles = "rounded-full";
const msgWrapperStyles =
  "flex flex-wrap items-center justify-start border-2 border-slate-500 my-1 text-black rounded-lg py-1 px-4 max-w-5/6 ";
const msgStyles = "break-words w-full";

type MessageFCType = FC<{ message: string; currentUser: boolean }>;

export const Message: MessageFCType = ({ message, currentUser }) => {
  const authCtx = useContext(AuthContext);

  const loggedUserAvatar: AvatarType | undefined = avatars.find(
    (avatar) => avatar.avatarUrl === authCtx.userLogo
  );

  return (
    <div className={"flex my-2 " + (currentUser ? "justify-end" : "")}>
      <div className={imgWrapperStyles + (currentUser ? "order-2" : "")}>
        <img
          className={imgStyles}
          src={loggedUserAvatar?.avatarUrl ?? "Img not found!"}
          alt="Avatar..."
        />
      </div>
      <div
        className={
          msgWrapperStyles +
          (currentUser
            ? "mr-4"
            : "ml-4 border-transparent bg-slate-300 text-white")
        }
      >
        <h1 className={msgStyles}>{message}</h1>
      </div>
    </div>
  );
};
