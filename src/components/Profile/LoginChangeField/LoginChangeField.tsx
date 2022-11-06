import { FC, useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { AuthContextType } from "../../../types/authContextTypes";
import { Button } from "../../Button/Button";
import { ProfileUILine } from "../ProfileUILine/ProfileUILine";

export const LoginChangeField: FC<{ showModalHandler: () => void }> = ({
  showModalHandler,
}) => {
  return (
    <ProfileUILine optionalClass="">
      <p className="self-center">Change login:</p>
      <Button>Zmien</Button>
    </ProfileUILine>
  );
};
