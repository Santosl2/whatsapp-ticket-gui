import { IWebSocket } from "./interfaces";
import { Server } from "http";

import { Server as SocketIoServer } from "socket.io";
import { IWhatsapp } from "../Whatsapp/interfaces";
import { WASocket } from "@whiskeysockets/baileys";

class SocketIo implements IWebSocket {
  private io: SocketIoServer | null = null;

  constructor(private whatsapp: IWhatsapp) {}

  get server(): SocketIoServer | null {
    return this.io;
  }

  connect(server: Server): void {
    const io = new SocketIoServer(server);

    this.io = io;

    this.listenEvents();
  }

  async listenEvents(): Promise<void> {
    const events = await import("./events");

    // listen all events automatically
    Object.entries(events).forEach(([key, Instance]) => {
      console.log(`listening event ${key}`);
      new Instance(this, this.whatsapp).execute();
    });
  }
}

export { SocketIo };
