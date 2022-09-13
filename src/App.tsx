import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

import { Route, Routes } from "react-router-dom";

import { WelcomePage } from "./pages/WelcomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";

export function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path={"/"} element={<WelcomePage />} />
      <Route path={"login"} element={<LoginPage isRegistering={false} />} />
      <Route
        path={"register"}
        element={<RegisterPage isRegistering={true} />}
      />
      {isAuth && (
        <>
          <Route path={"chat"} element={<ChatPage />} />
          <Route path={"profile"} element={<ProfilePage />} />
        </>
      )}
    </Routes>
  );
}
