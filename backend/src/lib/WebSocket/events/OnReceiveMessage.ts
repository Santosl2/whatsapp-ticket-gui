import { WASocket } from "@whiskeysockets/baileys";
import { IWebSocket } from "../interfaces";
import { ICustomEvent } from "./interfaces";
import { IWhatsapp } from "../../Whatsapp/interfaces";
import { Server as SocketIoServer } from "socket.io";
import { MessageUseCase } from "@useCase/message-use-case";
import { ICreateMessageDTO } from "dto/create-message-dto";

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
      const fromMe = messageData.key.fromMe ?? false;
      const messageBody =
        messageData.message?.extendedTextMessage?.text ??
        messageData.message?.conversation;

      const remoteJid = messageData.key.remoteJid;

      if (remoteJid === "status@broadcast" || remoteJid?.endsWith("@g.us"))
        return;

      const data: ICreateMessageDTO = {
        id: messageData.key.id!,
        message: messageBody ?? "No Body",
        phone: messageData.key.remoteJid ?? "No phone",
        pushName: messageData.pushName ?? "No name",
        fromMe,
        timestamp: Number(messageData.messageTimestamp ?? 0),
      };

      MessageUseCase.execute(data);

      socket?.emit("update-last-message", {
        contactId: data.phone,
        lastMessage: data.message,
        receivedAt: data.timestamp,
      });

      socket?.emit("receive-message", data);
    });
  }
}

export { OnReceiveMessage };
