import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatContext } from "../../../context/chat-context";
import { Button } from "../../Button/Button";
import { Message } from "./Message/Message";

export const ChatView = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatCtx = useContext(ChatContext);
  const [messageText, setMessageText] = useState<string>("");

  const typingMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.currentTarget.value);
  };

  const sendMessageHandler = (msg: string) => {
    chatCtx.sendMessage(msg);
    setMessageText("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatCtx.chatMessages]);

  return (
    <section className="col-start-5 col-end-10 row-start-1 my-20 row-end-6 rounded-2xl flex flex-col 2xl:col-start-6 2xl:col-end-9 2xl:row-start-2 2xl:row-end-5 2xl:my-0 2xl:scale-110">
      <div className="title w-full basis-16 bg-cyan-700  rounded-t-xl flex justify-evenly items-center">
        <h1 className="text-xl font-mono basis-5/6 text-center">
          Wariaci React
        </h1>
        <button className="font-extrabold text-2xl hover:text-red-400">
          X
        </button>
      </div>
      <div className="content basis-3/4 overflow-y-auto overflow-x-hidden p-3 bg-slate-200 flex flex-col">
        {chatCtx.chatMessages.map((message) => (
          <Message
            key={message.id}
            message={message.messageText}
            currentUser={false}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="sendmsg basis-16  bg-cyan-700  flex justify-between items-center px-10 py-1 rounded-b-xl">
        <input
          type="text"
          onChange={typingMessageHandler}
          value={messageText}
          placeholder="Send a message..."
          className="h-2/3 w-4/5 px-4 py-1 text-black placeholder:text-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessageHandler(messageText);
          }}
        />
        <Button
          onClick={() => sendMessageHandler(messageText)}
          customClasses="bg-white border-2 border-cyan-700 text-black px-4 hover:bg-slate-400 hover:border-transparent hover:text-inherit"
        >
          Send
        </Button>
      </div>
    </section>
  );
};
