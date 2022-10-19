import React, { FC, ReactNode, useState } from "react";
import { io } from "socket.io-client";
import {
  AuthContextType,
  changeUsernameFuncType,
  loginFuncArgsType,
  setChangeLogoFuncType,
  socketUnionType,
} from "../types/authContextTypes";

// IDE helper function
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (tokenString, incomingUserID, userAvatarImgUrl) => {},
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
  const [userLogo, setUserLogo] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<socketUnionType>(null);
  const [userID, setUserID] = useState<string>("");

  const login: loginFuncArgsType = (
    tokenString,
    incomingUserID,
    userAvatarImgUrl
  ) => {
    setToken(tokenString);
    setIsAuth(true);
    setUserID(incomingUserID);
    setUserLogo(userAvatarImgUrl);
    setSocket(io("http://localhost:3008"));
  };

  const logout = () => {
    setToken("");
    setIsAuth(false);
    setUserID("");
    setUserLogo("");
    setSocket(null);
  };

  const setChangeLogo: setChangeLogoFuncType = async (imageUrl) => {
    try {
      const res = await fetch("http://localhost:3008/api/profile/change-logo", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ changedLogoUrl: imageUrl }),
      });
      const data = await res.json();

      if (data.status === "error")
        return console.log("nie udalo sie zmienic logo");
      setUserLogo(imageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const changeUsernameHandler: changeUsernameFuncType = async (
    typedUsername,
    isChanging = false
  ) => {
    if (typedUsername.trim() === username) return;

    // Case when im changing username from profile page - POSTing new username, saving in DB, getting back and saving in ctx
    if (isChanging) {
      console.log("changing");
      try {
        const res = await fetch(
          "http://localhost:3008/api/profile/change-name",
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ changedName: typedUsername }),
          }
        );
        const resData = await res.json();
        if (resData.status !== "ok")
          return console.log("nie udalo sie zmienic");

        setUsername(resData.data.username);
      } catch (e) {
        console.log(e);
      }
    } else {
      // Case when im changing username initially - getting user info when loggin in and saving in ctx
      console.log("initial");
      setUsername(typedUsername);
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
