import { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../server";
import { validate } from "uuid";

export const deleteUser = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url } = request;
  if (url) {
    const urlParts = url.split("/").filter((part) => part !== "");
    if (urlParts.length === 3) {
      const userID = urlParts[2];
      const thisIndex = users.findIndex((item) => item.id === userID);
      if (!validate(userID)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify("Invalid userID"));
        return;
      }
      if (thisIndex === -1) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify(`User with id ${userID} not found`));
        return;
      }
      users.splice(thisIndex, 1);
      response.writeHead(204);
      response.end();
    }
  }
};
