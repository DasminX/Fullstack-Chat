import { useContext } from "react";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContext } from "../context/chat-context";

const mainStyle =
  "bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5";

export const ChatPage = () => {
  const { isAuth } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  return (
    <>
      {isAuth && <Nav />}
      <main className={mainStyle}>
        <RoomsPanel />
        {chatCtx.roomID && <ChatView />}
      </main>
    </>
  );
};
