import { useContext } from "react";
import { ChatContext } from "../../../../context/chat-context";
import { ChatContextType } from "../../../../types/chatContextTypes";
import { ChatUpperBannerFCType } from "../../../../types/componentsTypes";

const upperBannerStyles =
  "title w-full basis-16 bg-cyan-700  rounded-t-xl flex justify-evenly items-center";
const upperBannerH1Styles = "text-xl font-mono basis-5/6 text-center";
const upperBannerButtonStyles = "font-extrabold text-3xl hover:text-red-400";

export const ChatUpperBanner: ChatUpperBannerFCType = ({ roomName }) => {
  const chatCtx = useContext<ChatContextType>(ChatContext);

  return (
    <div className={upperBannerStyles}>
      <h1 className={upperBannerH1Styles}>{roomName}</h1>
      <button
        onClick={chatCtx.leaveCurrentRoomHandler}
        className={upperBannerButtonStyles}
      >
        &times;
      </button>
    </div>
  );
};
