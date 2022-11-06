import React, { FC, ReactNode, useContext, useState } from "react";
import { AuthContextType } from "../types/authContextTypes";
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
  sendMessage: (message, isSystemMsg, roomID) => {},
  loading: false,
  rooms: [],
  updateRoomArray: (rooms) => {},
  switchLoader: (isShown) => {},
  getAllMessagesFromDB: (messages) => {},
  receiveMessage: (message, sendByUserLogo) => {},
  reset: () => {},
});

// Provider
export const ChatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chatCtx = useContext<ChatContextType>(ChatContext);
  const authCtx = useContext<AuthContextType>(AuthContext);

  const [rooms, setRooms] = useState<RoomDataType[]>([]);
  const [chatMessages, setChatMessages] = useState<chatMessageType[]>([]);
  const [roomID, setRoomID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const updateRoomArray = (roomsData: RoomDataType[]) => {
    setRooms(roomsData);
  };

  const switchLoader = (isShown: boolean) => {
    setLoading(isShown);
  };

  const joinRoomHandler = (clickedRoomID: string) => {
    if (authCtx.socket == null) {
      chatCtx.reset();
      return authCtx.logout();
    }

    authCtx.socket.emit("joiningRoom", {
      clickedRoomID,
      currentUserID: authCtx.userID,
    });

    setRoomID(clickedRoomID);
  };

  const leaveCurrentRoomHandler = () => {
    if (authCtx.socket == null) {
      chatCtx.reset();
      return authCtx.logout();
    }
    authCtx.socket.emit("leavingRoom", {
      roomID,
      currentUserID: authCtx.userID,
    });
    setChatMessages([]);
    setRoomID("");
  };

  const sendMessage = (
    textMessage: string,
    isSystemMsg: boolean,
    leavingRoomID: string = ""
  ) => {
    if (authCtx.socket == null) {
      chatCtx.reset();
      return authCtx.logout();
    }
    let msgObj: chatMessageType;
    if (isSystemMsg) {
      msgObj = {
        id: Math.random().toString().slice(2, 20),
        sendByUserID: "system",
        sendInRoomID: roomID || leavingRoomID,
        textMessage,
      };
    } else {
      msgObj = {
        id: Math.random().toString().slice(2, 20),
        sendByUserID: authCtx.userID,
        sendByUserLogo: authCtx.userLogo,
        sendInRoomID: roomID,
        sendDate: new Date().toLocaleString(),
        textMessage,
      };
    }

    authCtx.socket.emit("sendMessage", msgObj);
    setChatMessages((prevChatMessages) => [...prevChatMessages, msgObj]);
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

  const reset = () => {
    setRooms([]);
    setChatMessages([]);
    setRoomID("");
    setLoading(false);
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
        reset,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
