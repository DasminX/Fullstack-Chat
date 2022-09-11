import { FC } from "react";

export const RoomPreview: FC<{
  name: string;
  imgUrl: string;
  activeInRoom: number;
  userInRoom: boolean;
}> = ({ name, imgUrl, activeInRoom, userInRoom }) => {
  return (
    <div className="border-blue-300 border-b-2 last:border-b-0 w-full h-1/6 flex justify-evenly hover:bg-black/20 transition-colors duration-50">
      <div className="h-3/5 w-auto self-center">
        <img
          src={imgUrl}
          alt={"random"}
          className="max-h-full object-cover rounded-full"
        />
      </div>
      <h1 className="text-black basis-1/2 text-center self-center text-xl font-extralight">
        {name}
      </h1>
      <div className="text-black text-center self-center grow-2 flex flex-col h-4/5 justify-evenly">
        <h2 className="">Aktywni: {activeInRoom}</h2>
        <button
          className={`rounded-xl px-4 py-1 hover:bg-slate-500 hover:scale-110 transition duration-200 ${
            userInRoom
              ? "bg-white border-2 border-slate-500 hover:bg-red-400 hover:border-transparent"
              : "bg-slate-400"
          }`}
        >
          {userInRoom ? "Rozłącz" : "Dołącz!"}
        </button>
      </div>
    </div>
  );
};
