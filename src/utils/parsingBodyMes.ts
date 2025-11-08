import { IncomingMessage } from "http";
import { receiveRequest } from "./receiveReq";
import { IUser } from "../interfaces/interfaces";

export const reqBodyMes = async (
  req: IncomingMessage,
): Promise<Partial<IUser> | undefined> => {
  const message = await receiveRequest(req);
  if (message) {
    return JSON.parse(message);
  } else {
    return undefined;
  }
};
