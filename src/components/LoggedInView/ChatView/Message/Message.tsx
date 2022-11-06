import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";
import { AuthContextType } from "../../../../types/authContextTypes";
import { MessageFCType } from "../../../../types/componentsTypes";

const imgWrapperStyles = "h-auto w-1/12 min-w-1/12 ";
const imgStyles = "rounded-full";
const msgWrapperStyles =
  "flex flex-wrap items-center justify-start border-2 border-slate-500 my-1 text-black rounded-lg py-1 px-4 max-w-5/6 ";
const msgStyles = "break-words w-full";

export const Message: MessageFCType = ({
  message,
  sendByUserID,
  sendByUserLogo,
  sendDate,
}) => {
  const authCtx = useContext<AuthContextType>(AuthContext);

  if (
    sendByUserID === "system" ||
    sendByUserID == null ||
    sendByUserLogo == null
  ) {
    return (
      <div className="flex my-1 justify-center">
        <h1 className="text-gray-500">{message}</h1>
      </div>
    );
  }

  return (
    <div
      className={
        "flex my-2 " + (sendByUserID === authCtx.userID ? "justify-end" : "")
      }
    >
      <div
        className={
          imgWrapperStyles + (sendByUserID === authCtx.userID ? "order-2" : "")
        }
      >
        <img
          className={imgStyles}
          src={
            sendByUserID === authCtx.userID ? authCtx.userLogo : sendByUserLogo
          }
          alt={sendDate}
          title={sendDate ? new Date(sendDate).toLocaleString() : ""}
        />
      </div>
      <div
        className={
          msgWrapperStyles +
          (sendByUserID === authCtx.userID
            ? "mr-4"
            : "ml-4 border-transparent bg-slate-300 text-white")
        }
      >
        <h1 className={msgStyles}>{message}</h1>
      </div>
    </div>
  );
};
