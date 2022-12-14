import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { ChatContext } from "../../../context/chat-context";
import { AuthContextType } from "../../../types/authContextTypes";
import { ChatContextType } from "../../../types/chatContextTypes";

const navStyles =
  "relative flex justify-end bg-cyan-900 border-b-2 border-neutral-400  h-14 w-full px-8 py-2";
const ulStyles = "flex basis-1/2 justify-evenly items-center text-white";

export const Nav = () => {
  const { socket, logout } = useContext<AuthContextType>(AuthContext);
  const chatCtx = useContext<ChatContextType>(ChatContext);

  const logoutHandler = () => {
    if (socket == null) {
      chatCtx.reset();
      return logout();
    }
    socket.emit("disconnect");
    logout();
  };

  const navLinkStyle = (navLinkData: { isActive: boolean }) => {
    return (
      "cursor-pointer hover:text-slate-400 text-lg" +
      (navLinkData.isActive ? " border-b-2 border-white" : "")
    );
  };

  return (
    <nav className={navStyles}>
      <ul className={ulStyles}>
        <NavLink to={"/chat"} className={navLinkStyle}>
          Chat
        </NavLink>
        <NavLink to={"/profile"} className={navLinkStyle}>
          Profile
        </NavLink>
        <NavLink to={"/login"} className={navLinkStyle} onClick={logoutHandler}>
          Logout
        </NavLink>
      </ul>
    </nav>
  );
};
