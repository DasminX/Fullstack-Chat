import React, { FC, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./auth-context";

// Types
type chatMessageType = {
  textMessage: string;
  id: string;
  sendByUserID: string;
};

export type RoomDataType = {
  name: string;
  id: string;
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
  getAllMessagesFromDB: (messages: any[]) => void; //TODO
  receiveMessage: (message: any) => void; //TODO
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
  getAllMessagesFromDB: (messages) => {}, //TODO
  receiveMessage: (message) => {}, //TODO
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

  console.log(chatMessages);

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
    setChatMessages([]);
    authCtx.socket.emit("leavingRoom", {
      roomID,
      currentUserID: authCtx.userID,
    });
    setRoomID("");
  };

  const sendMessage = (textMessage: string) => {
    const newMessageObj: chatMessageType = {
      textMessage,
      id: Math.random().toString().slice(2, 20),
      sendByUserID: authCtx.userID,
    };
    authCtx.socket.emit("sendMessage", newMessageObj, roomID, authCtx.userID);

    const newMessagesArray = [...chatMessages, newMessageObj];
    setChatMessages(newMessagesArray);
  };

  const getAllMessagesFromDB = (messages: any[]) => {
    // TODO DO ZMIANY NA TYP
    setChatMessages(messages);
  };

  const receiveMessage = (message: any) => {
    setChatMessages((prevMsgs) => [...prevMsgs, message]);
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
        getAllMessagesFromDB,
        receiveMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
