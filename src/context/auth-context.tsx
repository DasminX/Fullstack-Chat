import React, { FC, ReactNode, useState } from "react";
import { avatars } from "../utils/avatars";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (tokenString: string) => void;
  logout: () => void;
  username: string;
  setChangeUsername: (username: string) => void;
  userLogo: string;
  setChangeLogo: (imageUrl: string) => void;
  token: string;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (tokenString) => {},
  logout: () => {},
  username: "John Doe",
  setChangeUsername: (username) => {},
  userLogo: "",
  setChangeLogo: (imageUrl) => {},
  token: "",
});

// Provider
export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLogo, setUserLogo] = useState<string>(avatars[0].avatarUrl);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("John Doe");
  const [token, setToken] = useState<string>("");

  const login = (tokenString: string) => {
    setToken(tokenString);
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    setToken("");
  };

  const setChangeLogo = (imageUrl: string) => {
    setUserLogo(imageUrl);
  };

  const setChangeUsername = (username: string) => {
    setUsername(username);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
        username,
        setChangeUsername,
        userLogo,
        setChangeLogo,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
