import { useContext } from "react";
import { ChatView } from "../components/LoggedInView/ChatView/ChatView";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { RoomsPanel } from "../components/LoggedInView/RoomsPanel/RoomsPanel";
import { AuthContext } from "../context/auth-context";
import { ChatContextProvider } from "../context/chat-context";

export const ChatPage = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      {isAuth && <Nav />}
      <main className="bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5">
        <RoomsPanel />
        <ChatContextProvider>
          <ChatView />
        </ChatContextProvider>
      </main>
    </>
  );
};
