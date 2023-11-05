import { Server } from "http";

export interface IWebSocket {
  connect(app: Server): void;
  listenEvents(): Promise<void>;
}
