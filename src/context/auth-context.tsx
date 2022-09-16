import React, { FC, ReactNode, useState } from "react";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (isTokenAuth: boolean) => void;
  logout: () => void;
  username: string;
  setChangeUsername: (username: string) => void;
  userLogo: string;
  setChangeLogo: (imageUrl: string) => void;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (isTokenAuth) => {},
  logout: () => {},
  username: "John Doe",
  setChangeUsername: (username) => {},
  userLogo: "",
  setChangeLogo: (imageUrl) => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLogo, setUserLogo] = useState<string>(
    "https://media.istockphoto.com/vectors/letter-e-vector-design-template-vector-id1181190850"
  );
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("John Doe");

  const login = (isTokenAuth: boolean) => {
    if (isTokenAuth) {
      setIsAuth(true);
    }
  };

  const logout = () => {
    setIsAuth(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
