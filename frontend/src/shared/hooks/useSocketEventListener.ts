import { useEffect, useRef } from "react";
import { SocketService } from "../services/SocketService";

SocketService.getInstance();

export function useSocketEventListener(
  eventName: string,
  callback: (event?: any) => void
) {
  useEffect(() => {
    const socket = SocketService.socket;

    if (!socket) return;

    socket.on(eventName, callback);
    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);
}
