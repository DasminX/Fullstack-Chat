import React, { FC, ReactNode, useState } from "react";

// Types
type chatMessageType = {
  messageText: string;
  id: string;
};

type RoomIDType = string | null;

type ChatContextType = {
  roomID: RoomIDType;
  joinRoomHandler: (roomID: string) => void;
  leaveCurrentRoomHandler: () => void;
  chatMessages: chatMessageType[];
  sendMessage: (message: string) => void;
};

// Functions
export const ChatContext = React.createContext<ChatContextType>({
  roomID: null,
  joinRoomHandler: (roomID) => {},
  leaveCurrentRoomHandler: () => {},
  chatMessages: [],
  sendMessage: (message) => {},
});

// Provider
export const ChatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatMessages, setChatMessages] = useState<Array<chatMessageType>>([]);
  const [roomID, setRoomID] = useState<RoomIDType>("");

  const joinRoomHandler = (clickedRoomID: string) => {
    setRoomID(clickedRoomID);
  };

  const leaveCurrentRoomHandler = () => {
    setRoomID(null);
  };

  const sendMessage = (messageText: string) => {
    const newMessagesArray = [
      ...chatMessages,
      {
        messageText,
        id:
          Math.random().toString().slice(2, 6) +
          Math.random().toString().slice(2, 6),
      },
    ];
    setChatMessages(newMessagesArray);
  };

  return (
    <ChatContext.Provider
      value={{
        roomID,
        joinRoomHandler,
        leaveCurrentRoomHandler,
        chatMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
