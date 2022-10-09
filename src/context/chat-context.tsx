import React, { FC, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./auth-context";

// Types
type chatMessageType = {
  id: string;
  sendByUserID: string;
  sendByUserLogo: string;
  sendDate: string;
  sendInRoomID: string;
  textMessage: string;
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
  updateRoomArray: (rooms: RoomDataType[]) => void;
  switchLoader: (isShown: boolean) => void;
  getAllMessagesFromDB: (messages: any[]) => void; //TODO
  receiveMessage: (message: any, sendByUserLogo: string) => void; //TODO
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
  updateRoomArray: (rooms) => {},
  switchLoader: (isShown) => {},
  getAllMessagesFromDB: (messages) => {}, //TODO
  receiveMessage: (message, sendByUserLogo) => {}, //TODO
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

  const updateRoomArray = (roomsData: RoomDataType[]) => {
    setRooms(roomsData);
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
      id: Math.random().toString().slice(2, 20),
      sendByUserID: authCtx.userID,
      sendByUserLogo: authCtx.userLogo,
      sendDate: new Date().toISOString(),
      sendInRoomID: roomID,
      textMessage,
    };
    authCtx.socket.emit("sendMessage", newMessageObj);

    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessageObj]);
  };

  const getAllMessagesFromDB = (messages: any[]) => {
    // TODO DO ZMIANY NA TYP
    setChatMessages(messages);
  };

  const receiveMessage = (message: any, sendByUserLogo: string) => {
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      { ...message, sendByUserLogo },
    ]);
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
