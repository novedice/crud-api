import { IncomingMessage } from "http";
import { receiveRequest } from "./receiveReq";
// import { UserInterface } from "interfaces";

export const reqBodyMes = async (
  req: IncomingMessage,
): Promise<unknown | null> => {
  const message = await receiveRequest(req);
  if (message) {
    return JSON.parse(message);
  } else {
    return null;
  }
};
