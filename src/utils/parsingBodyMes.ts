import { IncomingMessage } from "http";
import { receiveRequest } from "./receiveReq";
import { IUser } from "../interfaces/interfaces";
// import { UserInterface } from "interfaces";

export const reqBodyMes = async (
  req: IncomingMessage,
): Promise<Partial<IUser> | undefined> => {
  const message = await receiveRequest(req);
  console.log("message in reqBodyMes", message);
  if (message) {
    return JSON.parse(message);
  } else {
    console.log("else in reqbodymes", message);
    return undefined;
  }
};
