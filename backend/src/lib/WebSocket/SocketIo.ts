import { IWebSocket } from "./interfaces";
import { Server } from "http";

import { Server as SocketIoServer } from "socket.io";

class SocketIo implements IWebSocket {
  private io: SocketIoServer | null = null;

  get server(): SocketIoServer | null {
    return this.io;
  }

  connect(server: Server): void {
    const io = new SocketIoServer(server);

    this.io = io;
  }

  listenEvents(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { SocketIo };
