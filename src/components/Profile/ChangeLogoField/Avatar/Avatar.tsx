import { AvatarFCType } from "../../../../types/componentsTypes";

const imgWrapperStyles = "logo-wrapper basis-1/3 p-2";
const imgStyles = "logo-img h-full w-full cursor-pointer ";

export const Avatar: AvatarFCType = ({
  avatar,
  selectedImg,
  selectImgHandler,
}) => {
  return (
    <div className={imgWrapperStyles} key={avatar.avatarId}>
      <img
        src={avatar.avatarUrl}
        alt="Avatar..."
        className={
          imgStyles +
          (avatar.avatarUrl === selectedImg ? "border-2 border-black" : "")
        }
        onClick={() => selectImgHandler(avatar.avatarUrl)}
      />
    </div>
  );
};
