import { IncomingMessage, ServerResponse } from "node:http";
import { users } from "server";
import { validate } from "uuid";

export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url } = request;
  if (url) {
    const urlParts = url.split("/").filter((part) => part !== "");
    if (urlParts.length === 3) {
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
      users.map((user) => (userID === user.id ? thisUser : user));
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(thisUser));
    }
  }
};
