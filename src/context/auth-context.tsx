import React, { FC, ReactNode, useState } from "react";

// Types
type AuthContextType = {
  isAuth: boolean;
  login: (isTokenAuth: boolean) => void;
  logout: () => void;
};

// Functions
export const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (isTokenAuth: boolean) => {},
  logout: () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = (isTokenAuth: boolean) => {
    if (isTokenAuth) {
      setIsAuth(true);
    }
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
