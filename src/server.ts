import { IUser } from "interfaces/interfaces";
import http from "node:http";
// import { users } from 'dataBase/dataBase';

const users: IUser[] = [];
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  const { headers, method, url } = req;
  const body: string[] = [];
  req
    .on("error", (error) => {
      console.error(error);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body.push(Buffer.toString());
      console.log("body:", body);
    });
  res.on("error", (error) => {
    console.log(error);
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  const bodyResponse = { headers, method, url, body };
  res.end(JSON.stringify(bodyResponse));
});
server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
