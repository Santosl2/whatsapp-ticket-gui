import { io, type Socket } from "socket.io-client";

class SocketService {
  private static instance: SocketService | null = null;
  static socket: Socket;

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    this.tryConnectSocket();
    return SocketService.instance;
  }

  static getSocket() {
    return this.socket;
  }

  static tryConnectSocket() {
    setTimeout(() => {
      const connection = io("http://192.168.1.12:3333", {
        transports: ["websocket"],
      });

      console.log("Trying to connect to socket...");

      connection.on("connect", () => {
        console.log("Connected!");

        this.socket = connection;
      });
    }, 2000);
  }
}

export { SocketService };
