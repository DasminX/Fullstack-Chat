import { Socket } from "socket.io-client";

export type loginFuncArgsType = (
  tokenString: string,
  incomingUserID: string,
  userAvatarImgUrl: string
) => void;

export type setChangeLogoFuncType = (imageUrl: string) => void;

export type changeUsernameFuncType = (
  username: string,
  isChanging: boolean
) => void;

export type socketUnionType = Socket | null;

export type AuthContextType = {
  isAuth: boolean;
  login: loginFuncArgsType;
  logout: () => void;
  username: string;
  changeUsernameHandler: changeUsernameFuncType;
  userLogo: string;
  setChangeLogo: setChangeLogoFuncType;
  token: string;
  socket: socketUnionType;
  userID: string;
};
