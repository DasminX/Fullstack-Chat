export type chatMessageType = {
  id: string;
  sendByUserID: string;
  sendByUserLogo: string;
  sendDate: string;
  sendInRoomID: string;
  textMessage: string;
};

export type RoomDataType = {
  name: string;
  id: string;
  logoURL: string;
  activeInRoom: number;
};

export type joinRoomFuncType = (roomID: string) => void;

export type sendMsgFuncType = (message: string) => void;

export type updateRoomFuncType = (rooms: RoomDataType[]) => void;

export type switchLoaderFuncType = (isShown: boolean) => void;

export type getAllMsgFuncType = (messages: chatMessageType[]) => void;

export type receiveMsgFuncType = (
  message: chatMessageType,
  sendByUserLogo: string
) => void;

export type ChatContextType = {
  roomID: string;
  joinRoomHandler: joinRoomFuncType;
  leaveCurrentRoomHandler: () => void;
  chatMessages: chatMessageType[];
  sendMessage: sendMsgFuncType;
  loading: boolean;
  rooms: RoomDataType[] | [];
  updateRoomArray: updateRoomFuncType;
  switchLoader: switchLoaderFuncType;
  getAllMessagesFromDB: getAllMsgFuncType;
  receiveMessage: receiveMsgFuncType;
};
