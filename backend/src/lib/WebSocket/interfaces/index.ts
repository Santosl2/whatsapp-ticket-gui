import { Server } from "http";

export interface IWebSocket {
  get server(): any;
  connect(app: Server): void;
  listenEvents(): Promise<void>;
}
