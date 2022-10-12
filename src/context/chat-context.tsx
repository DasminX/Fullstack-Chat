import React, { FC, ReactNode, useContext, useState } from "react";
import {
  ChatContextType,
  chatMessageType,
  RoomDataType,
} from "../types/chatContextTypes";
import { AuthContext } from "./auth-context";

// IDE helper function
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
  getAllMessagesFromDB: (messages) => {},
  receiveMessage: (message, sendByUserLogo) => {},
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

  const updateRoomArray = (roomsData: RoomDataType[]) => {
    setRooms(roomsData);
  };

  const switchLoader = (isShown: boolean) => {
    setLoading(isShown);
  };

  const joinRoomHandler = (clickedRoomID: string) => {
    if (authCtx.socket === null) return console.log("blad lub niezalogowany");
    authCtx.socket.emit("joiningRoom", {
      clickedRoomID,
      currentUserID: authCtx.userID,
    });
    setRoomID(clickedRoomID);
  };

  const leaveCurrentRoomHandler = () => {
    setChatMessages([]);
    if (authCtx.socket === null) return console.log("blad lub niezalogowany");
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
    if (authCtx.socket === null) return;

    authCtx.socket.emit("sendMessage", newMessageObj);
    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessageObj]);
  };

  const getAllMessagesFromDB = (messages: chatMessageType[]) => {
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
