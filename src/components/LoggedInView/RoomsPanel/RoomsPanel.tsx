import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { ChatContext } from "../../../context/chat-context";
import { AuthContextType } from "../../../types/authContextTypes";
import { ChatContextType, RoomDataType } from "../../../types/chatContextTypes";
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

type RoomsPanelFCType = FC<{ showAddingRoomFieldHandler: () => void }>;

export const RoomsPanel: RoomsPanelFCType = ({
  showAddingRoomFieldHandler,
}) => {
  const { socket } = useContext<AuthContextType>(AuthContext);
  const chatCtx = useContext<ChatContextType>(ChatContext);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const filterRoomsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value);
  };

  const filteredRoomData: RoomDataType[] = chatCtx.rooms.filter((room) =>
    room.name.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  useEffect(() => {
    if (socket === null)
      return console.log("socketa nie ma cos poszlo nie tak");

    socket.on("sendingInitialRooms", (rooms: RoomDataType[]) => {
      chatCtx.updateRoomArray(rooms);
    });

    socket.on("sendingUpdatedRooms", (rooms: RoomDataType[]) => {
      chatCtx.updateRoomArray(rooms);
    });

    return () => {
      socket.off("sendingInitialRooms");
      socket.off("sendingUpdatedRooms");
    };
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
        <button
          className={buttonAddRoomStyles}
          onClick={showAddingRoomFieldHandler}
        >
          +
        </button>
      </div>
      {filteredRoomData.length > 0 &&
        filteredRoomData.map((room) => (
          <RoomPreview
            key={room.id}
            roomID={room.id}
            roomName={room.name}
            logoURL={room.logoURL}
            activeInRoomNb={room.activeInRoom}
          />
        ))}
      {filteredRoomData.length === 0 && (
        <p className={textNoFoundStyles}>No rooms found.</p>
      )}
    </section>
  );
};
