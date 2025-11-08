import { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../server";
import { validate } from "uuid";
import { reqBodyMes } from "../utils/parsingBodyMes";

export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url } = request;
  const mes = await reqBodyMes(request);
  if (url) {
    const urlParts = url.split("/").filter((part) => part !== "");
    if (urlParts.length === 3) {
      const userID = urlParts[2];
      const thisIndex = users.findIndex((user) => user.id === userID);
      if (!validate(userID)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify("Invalid userID"));
        return;
      }
      if (!thisIndex || !users[thisIndex]) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify(`User with id ${userID} not found`));
        return;
      }
      if (mes) {
        const updatedUser = {
          id: users[thisIndex].id,
          username: mes.username ? mes.username : users[thisIndex].username,
          hobbies: mes.hobbies ? mes.hobbies : users[thisIndex].hobbies,
          age: mes.age ? mes.age : users[thisIndex].age,
        };
        users.splice(thisIndex, 1);
        users.push(updatedUser);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(updatedUser));
      }
    }
  }
};
