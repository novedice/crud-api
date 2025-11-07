import { createUser } from "./controllers/createUser";
import { IUser } from "./interfaces/interfaces";
import http from "node:http";
// import process from "node:process";
// import { users } from 'dataBase/dataBase';

export const users: IUser[] = [];
const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const { headers, method, url } = req;
  const body: string[] = [];
  // const url = req.url;
  console.log("url: ", url);
  console.log("method: ", method);
  console.log("head: ", headers);
  if (method === "POST") {
    await createUser(req, res);
  }
  req
    .on("error", (error) => {
      console.error(error);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body.push(Buffer.toString());
      // console.log("body:", body);
    });
  // res.on("error", (error) => {
  //   console.log(error);
  // });
  // res.writeHead(200, { "Content-Type": "application/json" });
  // const bodyResponse = { headers, method, url, body };
  // res.end(JSON.stringify(bodyResponse));
});
server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
