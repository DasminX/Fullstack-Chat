import { ChangeEvent, useState } from "react";
import { RoomPreview } from "./RoomPreview/RoomPreview";

type RoomsDataType = {
  name: string;
  id: string;
  imgUrl: string;
  activeInRoom: number;
  userInRoom: boolean;
};

const roomsData: Array<RoomsDataType> = [
  {
    name: "Wariaci React",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/id/531734121/pl/zdj%C4%99cie/ogie%C5%84-na-czarnym-tle-litera.webp?s=612x612&w=is&k=20&c=HD2iHAoA047GF7CFUtLzFTxiccIokAZkQWHcBXG6_ig=",
    activeInRoom: 13,
    userInRoom: true,
  },
  {
    name: "Eksperci JS",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/vectors/yellow-lines-geometric-vector-logo-letter-j-vector-id1171091309",
    activeInRoom: 22,
    userInRoom: false,
  },
  {
    name: "Miłośnicy ExpressJS",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/vectors/letter-e-vector-design-template-vector-id1181190850",
    activeInRoom: 19,
    userInRoom: false,
  },
];

export const RoomsPanel = () => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const filterRoomsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value);
  };

  const filteredRoomData = roomsData.filter((room) =>
    room.name.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  return (
    <section
      className="col-start-1 col-end-4 min-w-320 bg-white px-2 py-1 row-span-full"
      style={{
        minWidth: "335px",
        maxWidth: "440px",
      }}
    >
      <div className="w-4/5 h-8 ml-auto text-black flex mt-2 mb-4 justify-around">
        <input
          type="text"
          placeholder="Search by name..."
          className="basis-3/4 py-1 px-2 border-black border-2 rounded-md"
          onChange={filterRoomsHandler}
        />
        <button className="rounded-lg border-2 border-slate-300 p-1 self-center text-lg font-extrabold hover:bg-slate-300 hover:text-white">
          +
        </button>
      </div>
      {filteredRoomData.length > 0 &&
        filteredRoomData.map((room) => (
          <RoomPreview
            key={room.id}
            name={room.name}
            imgUrl={room.imgUrl}
            userInRoom={room.userInRoom}
            activeInRoom={room.activeInRoom}
          />
        ))}
      {filteredRoomData.length === 0 && (
        <p className="text-center text-black mt-16">No rooms found.</p>
      )}
    </section>
  );
};
