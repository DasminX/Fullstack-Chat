import { useContext } from "react";
import { ChatContext } from "../../../../context/chat-context";
import { ChatContextType } from "../../../../types/chatContextTypes";
import { RoomPreviewFCType } from "../../../../types/componentsTypes";
import { Button } from "../../../Button/Button";

/* STYLES */
const roomPreviewWrapperStyles =
  "border-blue-300 border-b-2 last:border-b-0 w-full h-1/6 flex justify-evenly hover:bg-black/20 transition-colors duration-50";
const chatImgWrapperStyles = "h-3/5 w-auto aspect-square self-center";
const chatImgStyles = "max-h-full object-cover rounded-full";
const chatTitleStyles =
  "text-black basis-1/2 text-center self-center text-xl font-extralight";
const rightSideStyles =
  "text-black text-center self-center grow-2 flex flex-col h-4/5 justify-evenly";
/* END OF STYLES */

export const RoomPreview: RoomPreviewFCType = ({
  roomID,
  roomName,
  logoURL,
  activeInRoomNb,
}) => {
  const chatCtx = useContext<ChatContextType>(ChatContext);

  const roomActionHandler = (roomID: string) => {
    if (roomID !== chatCtx.roomID) {
      chatCtx.switchLoader(true);
      if (chatCtx.roomID !== "") {
        chatCtx.leaveCurrentRoomHandler();
      }
      chatCtx.joinRoomHandler(roomID);
    } else chatCtx.leaveCurrentRoomHandler();
  };

  return (
    <div className={roomPreviewWrapperStyles}>
      <div className={chatImgWrapperStyles}>
        <img src={logoURL} alt={"random"} className={chatImgStyles} />
      </div>
      <h1 className={chatTitleStyles}>{roomName}</h1>
      <div className={rightSideStyles}>
        <h2 className="">Aktywni: {activeInRoomNb}</h2>
        <Button
          onClick={() => roomActionHandler(roomID)}
          customClasses={`text-black rounded-xl px-4 py-1 hover:bg-slate-500 hover:scale-110 duration-200 ${
            roomID === chatCtx.roomID
              ? "bg-white border-2 border-slate-500 hover:bg-red-400 hover:border-transparent"
              : "bg-slate-400"
          }`}
        >
          {roomID === chatCtx.roomID ? "Rozłącz" : "Dołącz!"}
        </Button>
      </div>
    </div>
  );
};
