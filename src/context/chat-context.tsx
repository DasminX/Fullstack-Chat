import React, { FC, ReactNode, useState } from "react";

// Types
type chatMessageType = {
  messageText: string;
  id: string;
};

type ChatContextType = {
  chatMessages: chatMessageType[];
  sendMessage: (message: string) => void;
};

// Functions
export const ChatContext = React.createContext<ChatContextType>({
  chatMessages: [],
  sendMessage: (message) => {},
});

// Provider
export const ChatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatMessages, setChatMessages] = useState<Array<chatMessageType>>([]);

  const sendMessage = (messageText: string) => {
    const newMessagesArray = [
      ...chatMessages,
      {
        messageText,
        id:
          Math.random().toString().slice(2, 9) +
          Math.random().toString().slice(2, 9),
      },
    ];
    setChatMessages(newMessagesArray);
  };

  return (
    <ChatContext.Provider value={{ chatMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
