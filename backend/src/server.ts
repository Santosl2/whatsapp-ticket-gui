import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import { WhatsappLib as whatsappLib } from "./lib/Whatsapp/Index";

import http from "http";
import { WebSocketLib } from "./lib/WebSocket";
import { messagesRoutes } from "./routes/messages.routes";
import "@database/index";
import SchemaValidationError from "errors/schema-validator-error";

const expressApp = express();
expressApp.use(express.json());
expressApp.use("/messages", messagesRoutes);

expressApp.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof SchemaValidationError) {
      return response.status(400).json({
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const app = http.createServer(expressApp);

app.listen(3333, async () => {
  await whatsappLib.connect();
  WebSocketLib.connect(app);

  console.log("Server is running on port 3333!");
});

const io = WebSocketLib.server;

export { app, io, whatsappLib };
