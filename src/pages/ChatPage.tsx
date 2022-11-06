import { useContext, useEffect, useState } from "react";
import { AddNewRoom } from "../components/LoggedInView/AddNewRoom/AddNewRoom";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { RoomPasswordPrompt } from "../components/LoggedInView/RoomPasswordPrompt/RoomPasswordPrompt";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContext } from "../context/chat-context";
import { chatMessageType } from "../types/chatContextTypes";
import { ChatViewDataType } from "../types/componentsTypes";

const mainStyle =
  "bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5";

export const ChatPage = () => {
  const { isAuth, socket, logout } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const [isAddingNewRoom, setIsAddingNewRoom] = useState<boolean>(false);

  const [roomPassword, setRoomPassword] = useState<string>("");

  const [chatViewData, setChatViewData] = useState<ChatViewDataType>({
    name: "",
    id: "",
  });

  const showAddingRoomFieldHandler = () => {
    setIsAddingNewRoom(true);
  };

  const closeAddingRoomFieldHandler = () => {
    setIsAddingNewRoom(false);
  };

  useEffect(() => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }

    socket.on("joinedRoom", (data: ChatViewDataType, systemMsg: string) => {
      const { name, id: roomID } = data;
      chatCtx.switchLoader(false);
      chatCtx.sendMessage(systemMsg, true);
      socket.emit("getInitialMessages", roomID);
      setChatViewData({ name, id: roomID });
    });

    return () => {
      socket.off("joinedRoom");
    };
  }, [chatCtx, logout, socket]);

  useEffect(() => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }

    socket.on("leftRoom", (roomID: string, systemMsg: string) => {
      // chyba potrzebne room id
      chatCtx.sendMessage(systemMsg, true, roomID);
      setChatViewData({ name: "", id: "" });
    });

    return () => {
      socket.off("leftRoom");
    };
  }, [chatCtx, logout, socket]);

  useEffect(() => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }

    socket.on("fetchedInitialMessages", (roomMessages: chatMessageType[]) => {
      if (Array.isArray(roomMessages) && roomMessages.length > 0) {
        chatCtx.getAllMessagesFromDB(roomMessages);
      }
    });

    return () => {
      socket.off("fetchedInitialMessages");
    };
  }, [socket, logout, chatCtx]);

  useEffect(() => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }

    socket.on(
      "receiveMessage",
      (message: chatMessageType, sendByUserLogo: string) => {
        chatCtx.receiveMessage(message, sendByUserLogo);
      }
    );

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, logout, chatCtx]);

  useEffect(() => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }

    socket.on("roomPasswordPrompt", (roomPasswordPrompt: string) => {
      setRoomPassword(roomPasswordPrompt);
    });

    return () => {
      socket.off("roomPasswordPrompt");
    };
  }, [socket, logout, chatCtx]);

  const checkRoomPasswordIsCorrect = (enteredRoomPassword: string) => {
    if (enteredRoomPassword === roomPassword) {
      console.log("poprawne");
      setRoomPassword("");
    } else {
      console.log("zle haslo");
    }
  };

  return (
    <>
      {isAuth && <Nav />}
      <main className={mainStyle}>
        <RoomsPanel showAddingRoomFieldHandler={showAddingRoomFieldHandler} />
        {typeof chatCtx.roomID === "string" &&
          chatCtx.roomID.trim().length > 0 && (
            <ChatView roomName={chatViewData.name} />
          )}
        {isAddingNewRoom && (
          <AddNewRoom
            closeAddingRoomFieldHandler={closeAddingRoomFieldHandler}
          />
        )}
        {roomPassword.length > 0 && (
          <RoomPasswordPrompt
            checkRoomPasswordIsCorrect={checkRoomPasswordIsCorrect}
          ></RoomPasswordPrompt>
        )}
      </main>
    </>
  );
};
