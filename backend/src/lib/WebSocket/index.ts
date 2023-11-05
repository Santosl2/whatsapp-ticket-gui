import { whatsappLib } from "../../server";
import { SocketIo } from "./SocketIo";

export const WebSocketLib = new SocketIo(whatsappLib);
