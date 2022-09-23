import React, { FC, ReactNode, useState } from "react";
import { io } from "socket.io-client";
import { avatars } from "../utils/avatars";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (tokenString: string) => void;
  logout: () => void;
  username: string;
  changeUsernameHandler: (username: string, isChanging: boolean) => void;
  userLogo: string;
  setChangeLogo: (imageUrl: string) => void;
  token: string;
  socket: any;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (tokenString) => {},
  logout: () => {},
  username: "",
  changeUsernameHandler: (username, isChanging) => {},
  userLogo: "",
  setChangeLogo: (imageUrl) => {},
  token: "",
  socket: null,
});

// Provider
export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLogo, setUserLogo] = useState<string>(avatars[0].avatarUrl);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  const login = (tokenString: string) => {
    setToken(tokenString);
    setIsAuth(true);
    setSocket(io("http://localhost:3008"));
  };

  const logout = () => {
    setToken("");
    setIsAuth(false);
    setSocket(null);
  };

  const setChangeLogo = (imageUrl: string) => {
    setUserLogo(imageUrl);
  };

  const changeUsernameHandler = (typedUsername: string, isChanging = false) => {
    if (typedUsername.trim() === username) return;

    // Case when im changing username from profile page - POSTing new username, saving in DB, getting back and saving in ctx
    if (isChanging) {
      console.log("changing");
      fetch("http://localhost:3008/api/profile/change-name", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ changedName: typedUsername }),
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData);
          setUsername(resData.data.username);
        });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
