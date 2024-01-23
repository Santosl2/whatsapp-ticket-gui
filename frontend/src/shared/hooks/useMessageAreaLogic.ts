import { useQuery } from "@tanstack/react-query";
import { useChat } from "../store/ChatStore";
import { HttpService } from "../services/HttpService";
import type { IMessageResult, Message } from "../interfaces";
import { useEffect, useState } from "react";
import { useSocketEventListener } from "./useSocketEventListener";

interface IReceiveMessage {
  id: string;
  message: string;
  phone: string;
  pushName: string;
  fromMe: boolean;
  timestamp: number;
}

export function useMessageAreaLogic() {
  const { currentChatId, currentUserName } = useChat();

  const { data } = useQuery({
    queryKey: ["messages", currentChatId],
    queryFn: () =>
      HttpService.getInstance().get<IMessageResult>(
        `messages/${currentChatId}`
      ),
    enabled: !!currentChatId,
  });

  const [{ messages }, setMessages] = useState<IMessageResult>(
    {} as IMessageResult
  );

  useEffect(() => {
    if (!data) return;

    setMessages(data);
  }, [data]);

  useSocketEventListener("receive-message", (data: IReceiveMessage) => {
    const parsedMessage: Message = {
      id: data.id,
      message: data.message,
      isFromMe: data.fromMe,
      receivedAt: data.timestamp,
    };

    setMessages((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, parsedMessage],
      };
    });
  });

  return {
    currentChatId,
    currentUserName,
    messages,
  };
}
