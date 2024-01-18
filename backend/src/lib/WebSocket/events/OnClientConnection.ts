import { WASocket } from "@whiskeysockets/baileys";
import { IWebSocket } from "../interfaces";
import { ICustomEvent } from "./interfaces";
import { Server as SocketIoServer } from "socket.io";

class OnClientConnection implements ICustomEvent {
  constructor(private socket: IWebSocket) {}

  execute(data?: any): void {
    const socket: SocketIoServer = this.socket?.server;

    socket?.on("connection", async (socket) => {
      console.log("a user connected");
    });
  }
}

export { OnClientConnection };
