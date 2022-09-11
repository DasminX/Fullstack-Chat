import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

export const Nav = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className="relative flex justify-end bg-zinc-700 border-b-2 border-neutral-400  h-14 w-full px-8 py-2">
      <ul className="flex basis-1/2 justify-evenly items-center text-white">
        <li className="cursor-pointer hover:text-slate-400">Profile</li>
        <li className="cursor-pointer hover:text-slate-400">Settings</li>
        <li
          className="cursor-pointer hover:text-slate-400"
          onClick={authCtx.logout}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};
