import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../../context/chat-context";
import { Button } from "../../Button/Button";
import { Message } from "./Message/Message";

/* STYLES */
const sectionStyles =
  "col-start-5 col-end-10 row-start-1 my-20 row-end-6 rounded-2xl flex flex-col 2xl:col-start-6 2xl:col-end-9 2xl:row-start-2 2xl:row-end-5 2xl:my-0 2xl:scale-110";
const upperBannerStyles =
  "title w-full basis-16 bg-cyan-700  rounded-t-xl flex justify-evenly items-center";
const upperBannerH1Styles = "text-xl font-mono basis-5/6 text-center";
const upperBannerButtonStyles = "font-extrabold text-3xl hover:text-red-400";
const chatContentStyles =
  "content basis-3/4 overflow-y-auto overflow-x-hidden p-3 bg-slate-200 flex flex-col";

const sendMsgAreaStyles =
  "sendmsg basis-16  bg-cyan-700  flex justify-between items-center px-10 py-1 rounded-b-xl";
const sendMsgAreaInputStyles =
  "h-2/3 w-4/5 px-4 py-1 text-black placeholder:text-black";
const sendMsgAreaButtonStyles =
  "bg-white border-2 border-cyan-700 text-black px-4 hover:bg-slate-400 hover:border-transparent hover:text-inherit";

/* END OF STYLES */

export const ChatView = () => {
  const chatCtx = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState<string>("");

  const typingMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.currentTarget.value);
  };

  const sendMessageHandler = (msg: string) => {
    if (msg.length > 0) {
      chatCtx.sendMessage(msg);
      setMessageText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatCtx.chatMessages]);

  return (
    <section className={sectionStyles}>
      <div className={upperBannerStyles}>
        <h1 className={upperBannerH1Styles}>Wariaci React</h1>
        <button
          onClick={chatCtx.leaveCurrentRoomHandler}
          className={upperBannerButtonStyles}
        >
          &times;
        </button>
      </div>
      <div className={chatContentStyles}>
        {chatCtx.chatMessages.map((message) => (
          <Message
            key={message.id}
            message={message.messageText}
            currentUser={false}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
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
    </section>
  );
};
