import React, { FC, ReactNode, useState } from "react";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (isTokenAuth: boolean) => void;
  logout: () => void;
  setChangeLogo: (imageUrl: string) => void;
  username: string;
  userLogo: string;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (isTokenAuth: boolean) => {},
  logout: () => {},
  setChangeLogo: (imageUrl) => {},
  username: "John Doe",
  userLogo: "",
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLogo, setUserLogo] = useState<string>(
    "https://media.istockphoto.com/vectors/letter-e-vector-design-template-vector-id1181190850"
  );
  const [isAuth, setIsAuth] = useState<boolean>(false);

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

  const username = "DasminX";

  return (
    <AuthContext.Provider
      value={{ isAuth, login, logout, username, userLogo, setChangeLogo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
