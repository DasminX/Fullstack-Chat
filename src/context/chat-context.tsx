import React, { FC, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./auth-context";

// Types
type chatMessageType = {
  messageText: string;
  id: string;
};

type RoomIDType = string | null;

export type RoomsDataType = {
  name: string;
  roomID: string;
  logoURL: string;
  activeInRoom: number;
};

type ChatContextType = {
  roomID: RoomIDType;
  joinRoomHandler: (roomID: string) => void;
  leaveCurrentRoomHandler: () => void;
  chatMessages: chatMessageType[];
  sendMessage: (message: string) => void;
  loader: boolean;
  rooms: RoomsDataType[] | [];
  updateRoomArray: (rooms: RoomsDataType[]) => void;
  switchLoader: (isShown: boolean) => void;
};

// Functions
export const ChatContext = React.createContext<ChatContextType>({
  roomID: null,
  joinRoomHandler: (roomID) => {},
  leaveCurrentRoomHandler: () => {},
  chatMessages: [],
  sendMessage: (message) => {},
  loader: false,
  rooms: [],
  updateRoomArray: (rooms) => {},
  switchLoader: (isShown) => {},
});

// Provider
export const ChatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<RoomsDataType[] | []>([]);
  const [chatMessages, setChatMessages] = useState<Array<chatMessageType>>([]);
  const [roomID, setRoomID] = useState<RoomIDType>("");
  const [loader, setLoader] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);

  const updateRoomArray = (rooms: RoomsDataType[]) => {
    setRooms(rooms);
  };

  const switchLoader = (isShown: boolean) => {
    setLoader(isShown);
  };

  const joinRoomHandler = (clickedRoomID: string) => {
    setLoader(true);
    authCtx.socket.emit("join room", {
      clickedRoomID,
      currentUserID: authCtx.userID,
    });
    setRoomID(clickedRoomID);
  };

  const leaveCurrentRoomHandler = () => {
    authCtx.socket.emit("leave room", {
      currentUserID: authCtx.userID,
      roomID,
    });
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
        loader,
        rooms,
        updateRoomArray,
        switchLoader,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
