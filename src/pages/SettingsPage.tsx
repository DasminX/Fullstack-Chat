import { useContext } from "react";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { AuthContext } from "../context/auth-context";

export const SettingsPage = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      {isAuth && <Nav />}
      <main className="bg-slate-900 min-h-[calc(100vh-3.5rem)] h-auto w-full text-white grid grid-cols-12 grid-flow-row-dense">
        <section className="col-start-3 col-end-11 my-20 bg-slate-300 rounded-2xl xl:col-start-4 xl:col-end-10"></section>
      </main>
    </>
  );
};
