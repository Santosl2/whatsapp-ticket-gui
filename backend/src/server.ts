import express from "express";
import { WhatsappLib } from "./lib/Whatsapp/Index";

import http from "http";
import { WebSocketLib } from "./lib/WebSocket";

const expressApp = express();
const app = http.createServer(expressApp);

const whatsapp = WhatsappLib;

app.listen(3333, async () => {
  await whatsapp.connect();

  console.log("Server is running on port 3333!");
});

WebSocketLib.connect(app);

const io = WebSocketLib.server;

export { app, io };
