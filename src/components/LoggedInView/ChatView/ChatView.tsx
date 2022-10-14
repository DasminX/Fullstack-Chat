import { ChatViewFCType } from "../../../types/componentsTypes";
import { ChatUpperBanner } from "./ChatUpperBanner/ChatUpperBanner";
import { MessagesField } from "./MessagesField/MessagesField";
import { SendMessageField } from "./SendMessageField/SendMessageField";

/* STYLES */
const sectionStyles =
  "col-start-5 col-end-10 row-start-1 my-20 row-end-6 rounded-2xl flex flex-col 2xl:col-start-6 2xl:col-end-9 2xl:row-start-2 2xl:row-end-5 2xl:my-0 2xl:scale-110";

export const ChatView: ChatViewFCType = ({ roomName }) => {
  return (
    <section className={sectionStyles}>
      <ChatUpperBanner roomName={roomName} />
      <MessagesField />
      <SendMessageField />
    </section>
  );
};
