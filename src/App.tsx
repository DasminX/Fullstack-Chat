import { Route, Routes } from "react-router-dom";

import { WelcomePage } from "./pages/WelcomePage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthPage } from "./pages/AuthPage";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { useContext } from "react";
import { ChatContext } from "./context/chat-context";
import { Loader } from "./components/Loader/Loader";

export function App() {
  const { loading } = useContext(ChatContext);
  return (
    <>
      <Routes>
        <Route path={"/"} element={<WelcomePage />} />
        <Route path={"login"} element={<AuthPage isRegistering={false} />} />
        <Route path={"register"} element={<AuthPage isRegistering={true} />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"chat"} element={<ChatPage />} />
          <Route path={"profile"} element={<ProfilePage />} />
        </Route>
      </Routes>
      {loading && <Loader />}
    </>
  );
}

// TODO ZMIANA LOGO
