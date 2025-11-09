import { IUser } from "./interfaces/interfaces";
import http from "node:http";
import { handleRoutes } from "./routes";

export const users: IUser[] = [];
const PORT = process.env.PORT ? process.env.PORT : "3500";
const API_PREFIX = "/api";

const server = http.createServer(async (req, res) => {
  try {
    handleRoutes(req, res);
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Something went wrong on the server..."));
  }
});
server.listen(PORT, () => {
  console.log(
    `server is listening on http://localhost:${PORT}${API_PREFIX}/users`,
  );
});
