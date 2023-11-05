import express from "express";
import { WhatsappLib as whatsappLib } from "./lib/Whatsapp/Index";

import http from "http";
import { WebSocketLib } from "./lib/WebSocket";

const expressApp = express();
const app = http.createServer(expressApp);

app.listen(3333, async () => {
  await whatsappLib.connect();
  WebSocketLib.connect(app);

  console.log("Server is running on port 3333!");
});

const io = WebSocketLib.server;

export { app, io, whatsappLib };
