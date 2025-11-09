import { createUser } from "./controllers/createUser";
import { deleteUser } from "./controllers/deleteUser";
import { getUsers } from "./controllers/readUsers";
import { updateUser } from "./controllers/updateUser";
import { IncomingMessage, ServerResponse } from "node:http";

export const handleRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const { method, url } = req;
  const urlParts = url?.split("/").filter((part) => part !== "");
  if (
    !urlParts ||
    !urlParts.find((part) => part === "api") ||
    !urlParts.find((part) => part === "users") ||
    urlParts.length > 3
  ) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Endpoint does not exist"));
  } else if (method === "POST" && urlParts.length === 2) {
    await createUser(req, res);
  } else if (method === "GET") {
    await getUsers(req, res);
  } else if (method === "PUT") {
    await updateUser(req, res);
  } else if (method === "DELETE") {
    await deleteUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Endpoint does not exist"));
  }
};
