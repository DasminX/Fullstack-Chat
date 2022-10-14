import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../../../context/chat-context";
import { ChatContextType } from "../../../../types/chatContextTypes";
import { Message } from "../Message/Message";

const chatContentStyles =
  "content basis-3/4 overflow-y-auto overflow-x-hidden p-3 bg-slate-200 flex flex-col";

export const MessagesField = () => {
  const chatCtx = useContext<ChatContextType>(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatCtx.chatMessages]);

  return (
    <div className={chatContentStyles}>
      {Array.isArray(chatCtx.chatMessages) &&
        chatCtx.chatMessages.length > 0 &&
        chatCtx.chatMessages.map((message) => (
          <Message
            key={message.id}
            message={message.textMessage}
            sendByUserID={message.sendByUserID}
            sendByUserLogo={message.sendByUserLogo}
          />
        ))}
      {Array.isArray(chatCtx.chatMessages) &&
        chatCtx.chatMessages.length === 0 && (
          <p className="text-lg text-black">There are no messages yet!</p> // TODO
        )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
