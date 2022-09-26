import React, { FC, ReactNode, useState } from "react";
import { io } from "socket.io-client";
import { useFetch } from "../hooks/useFetch";
import { avatars } from "../utils/avatars";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (tokenString: string, incomingUserID: string) => void;
  logout: () => void;
  username: string;
  changeUsernameHandler: (username: string, isChanging: boolean) => void;
  userLogo: string;
  setChangeLogo: (imageUrl: string) => void;
  token: string;
  socket: any;
  userID: string;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (tokenString, incomingUserID) => {},
  logout: () => {},
  username: "",
  changeUsernameHandler: (username, isChanging) => {},
  userLogo: "",
  setChangeLogo: (imageUrl) => {},
  token: "",
  socket: null,
  userID: "",
});

// Provider
export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLogo, setUserLogo] = useState<string>(avatars[0].avatarUrl);
  const [isAuth, setIsAuth] = useState<boolean>(true); // auth
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [userID, setUserID] = useState<string>("");

  const login = (tokenString: string, incomingUserID: string) => {
    setToken(tokenString);
    setIsAuth(true);
    setUserID(incomingUserID);
    setSocket(io("http://localhost:3008"));
  };

  const logout = () => {
    setToken("");
    setIsAuth(false);
    setUserID("");
    setSocket(null);
  };

  const setChangeLogo = (imageUrl: string) => {
    setUserLogo(imageUrl);
  };

  const changeUsernameHandler = async (
    typedUsername: string,
    isChanging = false
  ) => {
    if (typedUsername.trim() === username) return;

    try {
      if (isChanging) {
        // Case when im changing username from profile page - POSTing new username, saving in DB, getting back and saving in ctx
        const resData = await useFetch(
          "http://localhost:3008/api/profile/change-name",
          "POST",
          token,
          { changedName: typedUsername }
        );

        setUsername(resData.data.username);
      } else {
        // Case when im changing username initially - getting user info when loggin in and saving in ctx
        setUsername(typedUsername);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
        username,
        changeUsernameHandler,
        userLogo,
        setChangeLogo,
        token,
        socket,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
