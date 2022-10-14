import { ChangeEvent, useContext, useState } from "react";
import { ChatContext } from "../../../../context/chat-context";
import { ChatContextType } from "../../../../types/chatContextTypes";
import { Button } from "../../../Button/Button";

/* Styles */
const sendMsgAreaStyles =
  "sendmsg basis-16  bg-cyan-700  flex justify-between items-center px-10 py-1 rounded-b-xl";
const sendMsgAreaInputStyles =
  "h-2/3 w-4/5 px-4 py-1 text-black placeholder:text-black";
const sendMsgAreaButtonStyles =
  "bg-white border-2 border-cyan-700 text-black px-4 hover:bg-slate-400 hover:border-transparent hover:text-inherit";
/* End of Styles */

export const SendMessageField = () => {
  const chatCtx = useContext<ChatContextType>(ChatContext);
  const [messageText, setMessageText] = useState<string>("");
  const typingMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.currentTarget.value);
  };

  const sendMessageHandler = (msg: string) => {
    if (msg.length === 0) return;
    chatCtx.sendMessage(msg);
    setMessageText("");
  };
  return (
    <div className={sendMsgAreaStyles}>
      <input
        type="text"
        onChange={typingMessageHandler}
        value={messageText}
        placeholder="Send a message..."
        className={sendMsgAreaInputStyles}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessageHandler(messageText);
        }}
      />
      <Button
        onClick={() => sendMessageHandler(messageText)}
        customClasses={sendMsgAreaButtonStyles}
      >
        Send
      </Button>
    </div>
  );
};
