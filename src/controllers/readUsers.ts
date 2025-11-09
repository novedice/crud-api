import { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../server";
import { validate } from "uuid";

export const getUsers = async (
  req: IncomingMessage,
  response: ServerResponse,
) => {
  const { url } = req;
  if (url) {
    const urlParts = url.split("/").filter((part) => part !== "");
    if (urlParts.length === 2) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(users));
      return;
    } else if (urlParts.length === 3) {
      const userID = urlParts[2];
      const thisUser = users.find((user) => user.id === userID);
      if (!validate(userID)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify("Invalid userID"));
        return;
      }
      if (!thisUser) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify(`User with id ${userID} not found`));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(thisUser));
    }
  }
};
