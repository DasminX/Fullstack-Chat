import { Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AddNewRoom } from "../components/LoggedInView/AddNewRoom/AddNewRoom";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
// import { RoomPasswordPrompt } from "../components/LoggedInView/RoomPasswordPrompt/RoomPasswordPrompt";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContext } from "../context/chat-context";
import { chatMessageType } from "../types/chatContextTypes";
import { ChatViewDataType } from "../types/componentsTypes";

export const ChatPage = () => {
  const { isAuth, socket } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const [isAddingNewRoom, setIsAddingNewRoom] = useState<boolean>(false);

  // const [roomPassword, setRoomPassword] = useState<string>("");

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
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");

    socket.on("joinedRoom", (data: ChatViewDataType, systemMsg: string) => {
      const { name, id: roomID } = data;
      chatCtx.switchLoader(false);
      // chatCtx.setRoomIDHandler(roomID);
      chatCtx.sendMessage(systemMsg, true);
      socket.emit("getInitialMessages", roomID);
      setChatViewData({ name, id: roomID });
    });

    return () => {
      socket.off("joinedRoom");
    };
  }, [chatCtx, socket]);

  useEffect(() => {
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");

    socket.on("leftRoom", (roomID: string, systemMsg: string) => {
      chatCtx.sendMessage(systemMsg, true, roomID);
      setChatViewData({ name: "", id: "" });
    });

    return () => {
      socket.off("leftRoom");
    };
  }, [chatCtx, socket]);

  useEffect(() => {
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");

    socket.on("fetchedInitialMessages", (roomMessages: chatMessageType[]) => {
      if (Array.isArray(roomMessages) && roomMessages.length > 0) {
        chatCtx.getAllMessagesFromDB(roomMessages);
      }
    });

    return () => {
      socket.off("fetchedInitialMessages");
    };
  }, [socket, chatCtx]);

  useEffect(() => {
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");

    socket.on(
      "receiveMessage",
      (message: chatMessageType, sendByUserLogo: string) => {
        chatCtx.receiveMessage(message, sendByUserLogo);
      }
    );

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, chatCtx]);

  /*   useEffect(() => {
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");

    socket.on("roomPasswordPrompt", (roomPasswordPrompt: string) => {
      setRoomPassword(roomPasswordPrompt);
    });

    return () => {
      socket.off("roomPasswordPrompt");
    };
  }, [socket]); */

  /*   const checkRoomPasswordIsCorrect = (enteredRoomPassword: string) => {
    if (socket == null) return console.log("socketa nie ma cos poszlo nie tak");
    if (enteredRoomPassword === roomPassword) {
      setRoomPassword("");
      socket.emit('joiningPrivateRoom', {})
    } else {
      console.log("zle haslo");
    }
  }; */

  return (
    <>
      {isAuth && <Nav />}
      <Grid
        className="bg-slate-900 grid-cols-10 grid-rows-5"
        as={"main"}
        height={"calc(100vh - 3.5rem)"}
        width={"full"}
        textColor={"white"}
      >
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
        {/*         {roomPassword.length > 0 && (
          <RoomPasswordPrompt
            checkRoomPasswordIsCorrect={checkRoomPasswordIsCorrect}
          ></RoomPasswordPrompt>
        )} */}
      </Grid>
    </>
  );
};
