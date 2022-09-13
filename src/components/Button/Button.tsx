import { FC, MouseEventHandler, ReactNode } from "react";

export const Button: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  customClasses?: string;
}> = ({ onClick, children, customClasses }) => {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 transition duration-300 self-center text-base text-white " +
        (customClasses || "")
      }
    >
      {children}
    </button>
  );
};
