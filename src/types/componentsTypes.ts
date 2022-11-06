import { FC, ReactNode } from "react";

// FORM
export type AuthFormFCType = FC<{
  isRegistering: boolean;
  showModalHandler: (errMsg: string) => void;
}>;

export type AuthFormInputFCRefType = React.ForwardRefExoticComponent<
  {
    inputName: string;
    inputType: string;
  } & React.RefAttributes<HTMLInputElement>
>;

// CHAT VIEW
export type ChatViewDataType = {
  name: string;
  id: string;
};

// BUTTON
export type ButtonFCType = FC<{
  onClick?: any;
  children: ReactNode;
  customClasses?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
}>;

// MODAL
export type ModalMessageType = FC<{
  message: string;
  hideModalHandler: () => void;
}>;

// CHANGE LOGO FIELD && PROFILE PAGE
export type hideChangeLogoFuncType = (imageUrl: string) => void;

// CHANGE LOGO FIELD && AVATAR COMPONENT
export type selectImgFuncType = (avatarUrl: string) => void;

// CHANGE LOGO FIELD
export type ChangeLogoFieldFCType = FC<{
  hideChangeLogoHandler: hideChangeLogoFuncType;
}>;

//AUTH PAGE
export type AuthPageFCType = FC<{ isRegistering: boolean }>;

// AVATAR COMPONENT
export type AvatarType = { avatarId: string; avatarUrl: string };

export type AvatarFCType = FC<{
  avatar: AvatarType;
  selectedImg: string;
  selectImgHandler: selectImgFuncType;
}>;

// LOGO NAME CHANGE FIELD

export type LogoNameChangeFieldFCType = FC<{
  showModalHandler: () => void;
  showLogoChangeHandler: () => void;
}>;

// ADD NEW ROOM

export type AddNewRoomFCType = FC<{ closeAddingRoomFieldHandler: () => void }>;

// CHAT VIEW
export type ChatViewFCType = FC<{ roomName: string }>;

// MESSAGE
export type MessageFCType = FC<{
  message: string;
  sendByUserID: string;
  sendByUserLogo?: string;
  sendDate?: string;
}>;

// ROOM PREVIEW

export type RoomPreviewFCType = FC<{
  roomID: string;
  roomName: string;
  logoURL: string;
  activeInRoomNb: number;
}>;

// CHAT UPPER BANNER
export type ChatUpperBannerFCType = FC<{ roomName: string }>;
