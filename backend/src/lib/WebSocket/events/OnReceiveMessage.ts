import { WASocket } from "@whiskeysockets/baileys";
import { IWebSocket } from "../interfaces";
import { ICustomEvent } from "./interfaces";
import { IWhatsapp } from "../../Whatsapp/interfaces";
import { Server as SocketIoServer } from "socket.io";

class OnReceiveMessage implements ICustomEvent {
  constructor(
    private socket: IWebSocket,
    private whatsappConnection: IWhatsapp
  ) {}

  execute(data?: any): void {
    const whatsappClient: WASocket = this.whatsappConnection?.client;
    const socket: SocketIoServer = this.socket?.server;

    whatsappClient.ev.on("messages.upsert", async (m) => {
      const messageData = m.messages[0];
      const messageBody = messageData.message?.conversation;

      const data = {
        message: messageBody,
        from: messageData.key.remoteJid,
        pushName: messageData.pushName ?? "No name",
        fromMe: messageData.key.fromMe ?? false,
        timestamp: messageData.messageTimestamp,
      };

      socket?.emit("message", data);
    });
  }
}

export { OnReceiveMessage };
