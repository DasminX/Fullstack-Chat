import { useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import { AddNewRoom } from "../components/LoggedInView/AddNewRoom/AddNewRoom";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContext, RoomsDataType } from "../context/chat-context";

const mainStyle =
  "bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5";

export const ChatPage = () => {
  const { isAuth, socket } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const [isAddingNewRoom, setIsAddingNewRoom] = useState<boolean>(false);

  const [chatViewData, setChatViewData] = useState<any>({ name: "" }); // TODO

  const joiningRoom = chatCtx.rooms.find(
    (room) => room.roomID === chatCtx.roomID
  );

  const addNewRoomHandler = () => {
    setIsAddingNewRoom(true);
  };

  const closeAddingRoomFieldHandler = () => {
    setIsAddingNewRoom(false);
  };

  useEffect(() => {
    socket.on("EnteredRoom", (data: RoomsDataType) => {
      chatCtx.switchLoader(false);
      setChatViewData(data);

      // ZROBIC POPRAWKE NA PRZELACZANIE POMIEDZY POKOJAMI - NIE MA USER DISCONNECT Z POKOJU
    });

    socket.on("LeftRoom", () => {
      console.log("User left a room!");
    });

    return () => {
      socket.off("EnteredRoom");
      socket.off("LeftRoom");
    };
  }, [chatCtx, socket]);

  return (
    <>
      {isAuth && <Nav />}
      <main className={mainStyle}>
        <RoomsPanel addNewRoomHandler={addNewRoomHandler} />
        {chatCtx.roomID && <ChatView name={chatViewData.name} />}
        {isAddingNewRoom && (
          <AddNewRoom
            closeAddingRoomFieldHandler={closeAddingRoomFieldHandler}
          />
        )}
        {chatCtx.loader && (
          <Loader message={`Joining room ${joiningRoom?.name || ""}...`} />
        )}
      </main>
    </>
  );
};
