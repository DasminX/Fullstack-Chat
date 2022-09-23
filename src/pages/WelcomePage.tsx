import { NavLink } from "react-router-dom";

const mainStyles =
  "relative h-screen w-full flex justify-center items-center bg-slate-900 text-white";
const divWrapperStyles = "text-center";
const h1Styles = "text-5xl mb-16 font-semibold";
const h2Styles = "font-mono mb-12";
const navLinkStyles =
  "rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 hover:-translate-y-1 transition duration-300";

export const WelcomePage = () => {
  return (
    <main className={mainStyles}>
      <div className={divWrapperStyles}>
        <h1 className={h1Styles}>Welcome to FullStack Chat!</h1>
        <h2 className={h2Styles}>Feel free to text with other roommates.</h2>
        <NavLink to={"/login"} className={navLinkStyles}>
          Start now!
        </NavLink>
      </div>
    </main>
  );
};
