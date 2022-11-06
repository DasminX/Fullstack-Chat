import { FC, ReactNode } from "react";

const sectionStyles =
  "user-info w-full h-32 rounded-t-2xl flex px-8 py-4 border-b-2 border-cyan-700";

export const ProfileUILine: FC<{
  children?: ReactNode;
  optionalClass?: string;
}> = ({ children, optionalClass }) => {
  return <div className={`${sectionStyles} ${optionalClass}`}>{children}</div>;
};
