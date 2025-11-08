import { getUsers } from "./controllers/readUsers";
import { createUser } from "./controllers/createUser";
import { IUser } from "./interfaces/interfaces";
import http from "node:http";
import { updateUser } from "./controllers/updateUser";
import { deleteUser } from "./controllers/deleteUser";

export const users: IUser[] = [];
const PORT = process.env.PORT;
const API_PREFIX = "/api";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  // console.log("url: ", url);
  // console.log("method: ", method);
  // console.log("head: ", headers);
  const urlParts = url?.split("/").filter((part) => part !== "");
  if (
    !urlParts ||
    !urlParts.find((part) => part === "api") ||
    !urlParts.find((part) => part === "users") ||
    urlParts.length > 3
  ) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Endpoint does not exist"));
  } else {
    if (method === "POST") {
      await createUser(req, res);
    }
    if (method === "GET") {
      await getUsers(req, res);
    }
    if (method === "PUT") {
      await updateUser(req, res);
    }
    if (method === "DELETE") {
      await deleteUser(req, res);
    }
  }
});
server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}${API_PREFIX}`);
});
