import { IncomingMessage, ServerResponse } from "node:http";
import { reqBodyMes } from "../utils/parsingBodyMes";
import { IUser } from "../interfaces/interfaces";
import { users } from "../server";

export const createUser = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const mes = await reqBodyMes(request);
  console.log("mesmes", mes);
  if (mes) {
    if (mes.username && mes.age && mes.hobbies) {
      const userID = Date.now().toString(36);
      const newUser: IUser = {
        id: userID,
        username: mes.username,
        age: mes.age,
        hobbies: mes.hobbies,
      };
      users.push(newUser);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(newUser));
    } else {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify("Invalid data"));
    }
  }
};
