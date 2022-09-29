import { useContext, useEffect, useState } from "react";
import { AddNewRoom } from "../components/LoggedInView/AddNewRoom/AddNewRoom";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContext } from "../context/chat-context";

const mainStyle =
  "bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5";

type ChatViewDataType = {
  name: string;
};

export const ChatPage = () => {
  const { isAuth, socket } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const [isAddingNewRoom, setIsAddingNewRoom] = useState<boolean>(false);

  const [chatViewData, setChatViewData] = useState<ChatViewDataType>({
    name: "",
  }); // TODO

  const showAddingRoomFieldHandler = () => {
    setIsAddingNewRoom(true);
  };

  const closeAddingRoomFieldHandler = () => {
    setIsAddingNewRoom(false);
  };

  // Loader do zmiany

  useEffect(() => {
    socket.on("joinedRoom", (data: ChatViewDataType) => {
      const { name } = data;
      chatCtx.switchLoader(false);
      setChatViewData({ name });
    });

    socket.on("leftRoom", () => {
      setChatViewData({ name: "" });
    });
  }, [chatCtx, socket]);

  return (
    <>
      {isAuth && <Nav />}
      <main className={mainStyle}>
        <RoomsPanel showAddingRoomFieldHandler={showAddingRoomFieldHandler} />
        {typeof chatCtx.roomID === "string" &&
          chatCtx.roomID.trim().length > 0 && (
            <ChatView name={chatViewData.name} />
          )}
        {isAddingNewRoom && (
          <AddNewRoom
            closeAddingRoomFieldHandler={closeAddingRoomFieldHandler}
          />
        )}
      </main>
    </>
  );
};
