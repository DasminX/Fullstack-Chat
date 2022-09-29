import { avatars } from "../../../utils/avatars";
import { Button } from "../../Button/Button";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { Avatar } from "./Avatar/Avatar";

const asideStyles =
  "bg-slate-400 rounded-2xl col-start-1 col-end-4 row-start-1 row-span-3 mt-20 mx-10 p-4";
const avatarWrapperStyles =
  "avatars-wrapper h-4/5 flex flex-wrap p-2 overflow-y-scroll";

type ChangeLogoFieldFCType = FC<{
  hideChangeLogoHandler: (imageUrl: string) => void;
}>;

export const ChangeLogoField: ChangeLogoFieldFCType = ({
  hideChangeLogoHandler,
}) => {
  const { userLogo } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState<string>(userLogo);

  const selectImgHandler = (avatarUrl: string) => {
    setSelectedImg(avatarUrl);
  };

  return (
    <aside className={asideStyles}>
      <div className={avatarWrapperStyles}>
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
