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

      if (messageData.key.remoteJid === "status@broadcast") return;

      const data: ICreateMessageDTO = {
        id: messageData.key.id!,
        message: messageBody ?? "No Body",
        from: messageData.key.remoteJid ?? "No from",
        pushName: messageData.pushName ?? "No name",
        fromMe,
        timestamp: Number(messageData.messageTimestamp ?? 0),
      };
      // TODO saber qual chatId é a mensagem
      MessageUseCase.execute(data);

      socket?.emit("receive-message", data);
    });
  }
}

export { OnReceiveMessage };
