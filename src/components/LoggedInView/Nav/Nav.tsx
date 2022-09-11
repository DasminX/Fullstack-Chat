import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

export const Nav = () => {
  const authCtx = useContext(AuthContext);

  const navLinkStyle = (navLinkData: { isActive: boolean }) => {
    return (
      (navLinkData.isActive ? "border-b-2 border-white " : "") +
      "cursor-pointer hover:text-slate-400 text-lg"
    );
  };

  return (
    <nav className="relative flex justify-end bg-cyan-900 border-b-2 border-neutral-400  h-14 w-full px-8 py-2">
      <ul className="flex basis-1/2 justify-evenly items-center text-white">
        <NavLink to={"/chat"} className={navLinkStyle}>
          Chat
        </NavLink>
        <NavLink to={"/profile"} className={navLinkStyle}>
          Profile
        </NavLink>
        <NavLink to={"/settings"} className={navLinkStyle}>
          Settings
        </NavLink>
        <NavLink
          to={"/login"}
          className={navLinkStyle}
          onClick={authCtx.logout}
        >
          Logout
        </NavLink>
      </ul>
    </nav>
  );
};
