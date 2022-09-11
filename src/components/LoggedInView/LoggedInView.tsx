import { ChatView } from "./ChatView/ChatView";
import { RoomsPanel } from "./RoomsPanel/RoomsPanel";

export const LoggedInView = () => {
  return (
    <main className="bg-slate-900 h-[calc(100vh-3.5rem)] w-full text-white grid grid-cols-10 grid-rows-5">
      <RoomsPanel />
      <ChatView />
    </main>
  );
};
