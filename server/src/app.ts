import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";


import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");
const app = express();
const myServer = createServer(app);

const io = new Server(myServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) =>
  res.send(`Server is up and running`)
);

myServer.listen(port, host, () => {
  socket({ io });
});
