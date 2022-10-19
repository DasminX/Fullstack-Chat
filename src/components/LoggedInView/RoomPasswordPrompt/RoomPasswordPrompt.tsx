import { FC, useRef } from "react";

export const RoomPasswordPrompt: FC<{
  checkRoomPasswordIsCorrect: (enteredRoomPassword: string) => void;
}> = ({ checkRoomPasswordIsCorrect }) => {
  const roomPasswordInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-center rounded-xl w-96 h-64 bg-slate-400 ml-8 mt-8 flex flex-col justify-evenly">
      <h1 className="w-full my-4">Wpisz haslo do rooma:</h1>
      <input
        className="w-3/5 mx-auto text-black"
        ref={roomPasswordInputRef}
        type="text"
      />
      <button
        className="border-2 border-black w-1/6 mx-auto py-2 px-16 flex justify-center "
        onClick={() =>
          checkRoomPasswordIsCorrect(roomPasswordInputRef.current!.value)
        }
      >
        DOŁĄCZ
      </button>
    </div>
  );
};
