import { NavLink } from "react-router-dom";

export const WelcomePage = () => {
  return (
    <main className="relative h-screen w-full flex justify-center items-center bg-slate-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl mb-16 font-semibold">
          Welcome to FullStack Chat!
        </h1>
        <h2 className="font-mono mb-12">
          Feel free to text with other roommates.
        </h2>
        <NavLink
          to={"/login"}
          className="rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 hover:-translate-y-1 transition duration-300"
        >
          Start now!
        </NavLink>
      </div>
    </main>
  );
};
