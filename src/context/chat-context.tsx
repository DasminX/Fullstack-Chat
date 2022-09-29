import React, { FC, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./auth-context";

// Types
type chatMessageType = {
  messageText: string;
  id: string;
};

export type RoomDataType = {
  name: string;
  roomID: string;
  logoURL: string;
  activeInRoom: number;
};

type ChatContextType = {
  roomID: string;
  joinRoomHandler: (roomID: string) => void;
  leaveCurrentRoomHandler: () => void;
  chatMessages: chatMessageType[];
  sendMessage: (message: string) => void;
  loading: boolean;
  rooms: RoomDataType[] | [];
  updateRoomArray: (
    rooms: RoomDataType[] | RoomDataType,
    initial: boolean
  ) => void;
  switchLoader: (isShown: boolean) => void;
};

// Functions
export const ChatContext = React.createContext<ChatContextType>({
  roomID: "",
  joinRoomHandler: (roomID) => {},
  leaveCurrentRoomHandler: () => {},
  chatMessages: [],
  sendMessage: (message) => {},
  loading: false,
  rooms: [],
  updateRoomArray: (rooms, initial) => {},
  switchLoader: (isShown) => {},
});

// Provider
export const ChatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<RoomDataType[] | []>([]);
  const [chatMessages, setChatMessages] = useState<chatMessageType[]>([]);
  const [roomID, setRoomID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);

  const updateRoomArray = (
    roomData: RoomDataType[] | RoomDataType,
    initial: boolean
  ) => {
    if (Array.isArray(roomData) && initial) {
      setRooms(roomData);
    } else if (!Array.isArray(roomData) && !initial) {
      setRooms((prevRooms) => [...prevRooms, roomData]);
    }
  };

  const switchLoader = (isShown: boolean) => {
    setLoading(isShown);
  };

  const joinRoomHandler = (clickedRoomID: string) => {
    authCtx.socket.emit("joiningRoom", {
      clickedRoomID,
      currentUserID: authCtx.userID,
    });
    setRoomID(clickedRoomID);
  };

  const leaveCurrentRoomHandler = () => {
    authCtx.socket.emit("leavingRoom", {
      roomID,
      currentUserID: authCtx.userID,
    });
    setRoomID("");
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
        loading,
        rooms,
        updateRoomArray,
        switchLoader,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
