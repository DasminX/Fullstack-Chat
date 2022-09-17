import { FC, useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";

import { avatars } from "../../../../utils/avatars";

export const Message: FC<{ message: string; currentUser: boolean }> = ({
  message,
  currentUser,
}) => {
  const authCtx = useContext(AuthContext);

  const loggedUserAvatar = avatars.find(
    (avatar) => avatar.avatarUrl === authCtx.userLogo
  );

  return (
    <div className={"flex my-2 " + (currentUser ? "justify-end" : "")}>
      <div
        className={"h-auto w-1/12 min-w-1/12 " + (currentUser ? "order-2" : "")}
      >
        <img
          className="rounded-full"
          src={loggedUserAvatar!.avatarUrl}
          alt="Avatar..."
        />
      </div>
      <div
        className={
          "flex flex-wrap items-center justify-start border-2 border-slate-500 my-1 text-black rounded-lg py-1 px-4 max-w-5/6 " +
          (currentUser
            ? "mr-4"
            : "ml-4 border-transparent bg-slate-300 text-white")
        }
      >
        <h1 className="break-words w-full">{message}</h1>
      </div>
    </div>
  );
};
