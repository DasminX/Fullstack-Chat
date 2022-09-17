import { avatars } from "../../../utils/avatars";
import { Button } from "../../Button/Button";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { Avatar } from "./Avatar/Avatar";

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
          <Avatar
            key={avatar.avatarId}
            avatar={avatar}
            selectedImg={selectedImg}
            selectImgHandler={selectImgHandler}
          />
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
