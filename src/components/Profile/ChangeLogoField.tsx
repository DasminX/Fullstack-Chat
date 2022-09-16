import avatar1 from "../../images/avatar1.png";
import avatar2 from "../../images/avatar2.png";
import avatar3 from "../../images/avatar15.jpg";
import avatar4 from "../../images/avatar4.jpg";
import avatar5 from "../../images/avatar5.jpg";
import avatar6 from "../../images/avatar6.jpg";
import avatar7 from "../../images/avatar7.png";
import avatar8 from "../../images/avatar8.jpg";
import avatar9 from "../../images/avatar9.jpg";
import avatar10 from "../../images/avatar10.jpg";
import avatar11 from "../../images/avatar11.png";
import avatar12 from "../../images/avatar12.png";
import avatar13 from "../../images/avatar13.png";
import avatar14 from "../../images/avatar14.png";
import { Button } from "../Button/Button";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const avatars = [
  { avatarUrl: avatar1, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar2, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar3, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar4, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar5, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar6, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar7, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar8, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar9, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar10, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar11, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar12, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar13, avatarId: Math.random().toString().slice(2) },
  { avatarUrl: avatar14, avatarId: Math.random().toString().slice(2) },
];

export const ChangeLogoField: FC<{
  hideChangeLogoHandler: (imageUrl: string) => void;
}> = ({ hideChangeLogoHandler }) => {
  const authCtx = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(authCtx.userLogo);

  const selectImgHandler = (avatarUrl: string) => {
    setSelectedImg(avatarUrl);
  };

  return (
    <aside className="bg-slate-400 rounded-2xl col-start-1 col-end-4 row-start-1 row-span-3 mt-20 mx-10 p-4">
      <div className="avatars-wrapper h-4/5 flex flex-wrap p-2 overflow-y-scroll">
        {avatars.map((avatar) => (
          <div className="logo-wrapper basis-1/3 p-2 " key={avatar.avatarId}>
            <img
              src={avatar.avatarUrl}
              alt="Avatar..."
              className={
                "logo-img h-full w-full cursor-pointer " +
                (avatar.avatarUrl === selectedImg
                  ? "border-2 border-black"
                  : "")
              }
              onClick={() => selectImgHandler(avatar.avatarUrl)}
            />
          </div>
        ))}
      </div>
      <Button
        customClasses={"grow w-full my-4"}
        onClick={() => hideChangeLogoHandler(selectedImg)}
      >
        Change!
      </Button>
    </aside>
  );
};
