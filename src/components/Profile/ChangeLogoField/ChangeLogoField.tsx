import avatar1 from "../../../images/avatar1.png";
import avatar2 from "../../../images/avatar2.png";
import avatar3 from "../../../images/avatar15.jpg";
import avatar4 from "../../../images/avatar4.jpg";
import avatar5 from "../../../images/avatar5.jpg";
import avatar6 from "../../../images/avatar6.jpg";
import avatar7 from "../../../images/avatar7.png";
import avatar8 from "../../../images/avatar8.jpg";
import avatar9 from "../../../images/avatar9.jpg";
import avatar10 from "../../../images/avatar10.jpg";
import avatar11 from "../../../images/avatar11.png";
import avatar12 from "../../../images/avatar12.png";
import avatar13 from "../../../images/avatar13.png";
import avatar14 from "../../../images/avatar14.png";
import { Button } from "../../Button/Button";
import { FC, useState } from "react";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
];

export const ChangeLogoField: FC<{
  hideLogoChangeHandler: (imageUrl: string) => void;
}> = ({ hideLogoChangeHandler }) => {
  const [selectedImg, setSelectedImg] = useState("");

  const selectImgHandler = (avatarUrl: string) => {
    setSelectedImg(avatarUrl);
  };
  return (
    <aside className="bg-slate-400 rounded-2xl col-start-1 col-end-4 row-start-1 row-span-3 mt-20 mx-10 p-4">
      <div className="avatars-wrapper h-4/5 flex flex-wrap p-2 overflow-y-scroll">
        {avatars.map((avatar) => (
          <div className="basis-1/3 p-2">
            <img
              key={Math.random().toString().slice(2)}
              src={avatar}
              alt="Avatar..."
              className="h-full w-full cursor-pointer"
              onClick={() => selectImgHandler(avatar)}
            />
          </div>
        ))}
      </div>
      <Button
        customClasses={"grow w-full my-4"}
        onClick={() => hideLogoChangeHandler(selectedImg)}
      >
        Change!
      </Button>
    </aside>
  );
};
