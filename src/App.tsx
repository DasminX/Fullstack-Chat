import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

import { Nav } from "./components/LoggedInView/Navbar/Nav";
import { Route, Routes } from "react-router-dom";

import { LoggedInView } from "./components/LoggedInView/LoggedInView";
import { WelcomePage } from "./components/LoggedOutView/WelcomePage/WelcomePage";
import { AuthForm } from "./components/LoggedOutView/AuthForm/AuthForm";

export function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
      {isAuth && <Nav />}
      <Route path={"/"} element={<WelcomePage />} />
      <Route path={"/login"} element={<AuthForm isRegistering={false} />} />
      <Route path={"/register"} element={<AuthForm isRegistering={true} />} />
      {isAuth && <Route path={"/chat"} element={<LoggedInView />} />}
    </Routes>
  );
}
