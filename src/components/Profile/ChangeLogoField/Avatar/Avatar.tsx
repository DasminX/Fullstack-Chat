import { FC } from "react";

export const Avatar: FC<{
  avatar: { avatarId: string; avatarUrl: string };
  selectedImg: string;
  selectImgHandler: (avatarUrl: string) => void;
}> = ({ avatar, selectedImg, selectImgHandler }) => {
  return (
    <div className="logo-wrapper basis-1/3 p-2 " key={avatar.avatarId}>
      <img
        src={avatar.avatarUrl}
        alt="Avatar..."
        className={
          "logo-img h-full w-full cursor-pointer " +
          (avatar.avatarUrl === selectedImg ? "border-2 border-black" : "")
        }
        onClick={() => selectImgHandler(avatar.avatarUrl)}
      />
    </div>
  );
};
