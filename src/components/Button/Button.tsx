import { FC, ReactNode } from "react";

const buttonStyles =
  "rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 transition duration-300 self-center text-base text-white ";

type ButtonFCType = FC<{
  onClick?: any;
  children: ReactNode;
  customClasses?: string;
  type?: "submit" | "button" | "reset";
}>;

export const Button: ButtonFCType = ({
  onClick,
  children,
  customClasses,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles + (customClasses || "")}
    >
      {children}
    </button>
  );
};
