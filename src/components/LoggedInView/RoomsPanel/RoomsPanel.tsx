import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { ChatContext } from "../../../context/chat-context";
import { RoomsDataType } from "../../../context/chat-context";
import { RoomPreview } from "./RoomPreview/RoomPreview";

/* STYLES */
const sectionStyles =
  "col-start-1 col-end-4 min-w-320 bg-white px-2 py-1 row-span-full overflow-y-auto";
const filterRoomsWrapperStyles =
  "w-4/5 h-8 ml-auto text-black flex mt-2 mb-4 justify-around";
const filterRoomsInputStyles =
  "basis-3/4 py-1 px-2 border-black border-2 rounded-md";
const buttonAddRoomStyles =
  "rounded-lg border-2 border-slate-300 p-1 self-center text-lg font-extrabold hover:bg-slate-300 hover:text-white";
const textNoFoundStyles = "text-center text-black mt-16";
/* END OF STYLES */

type RoomsPanelFCType = FC<{ addNewRoomHandler: () => void }>;

export const RoomsPanel: RoomsPanelFCType = ({ addNewRoomHandler }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const chatCtx = useContext(ChatContext);
  const { socket } = useContext(AuthContext);

  const filterRoomsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value);
  };

  const filteredRoomData: RoomsDataType[] = chatCtx.rooms.filter((room) =>
    room.name.includes(searchInputValue)
  );

  useEffect(() => {
    socket.on("sending rooms", (rooms: RoomsDataType[]) => {
      chatCtx.updateRoomArray(rooms);
      chatCtx.switchLoader(false);
    });
  }, [socket, chatCtx]);

  return (
    <section
      className={sectionStyles}
      style={{
        minWidth: "335px",
        maxWidth: "440px",
      }}
    >
      <div className={filterRoomsWrapperStyles}>
        <input
          type="text"
          placeholder="Search by name..."
          className={filterRoomsInputStyles}
          onChange={filterRoomsHandler}
        />
        <button className={buttonAddRoomStyles} onClick={addNewRoomHandler}>
          +
        </button>
      </div>
      {filteredRoomData.length > 0 &&
        filteredRoomData.map((room) => (
          <RoomPreview
            key={room.roomID}
            roomID={room.roomID}
            name={room.name}
            logoURL={room.logoURL}
            activeInRoom={room.activeInRoom}
          />
        ))}
      {filteredRoomData.length === 0 && (
        <p className={textNoFoundStyles}>No rooms found.</p>
      )}
    </section>
  );
};
