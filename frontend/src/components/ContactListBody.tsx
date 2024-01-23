"use client";
import type { ILastMessageResult } from "@/shared/interfaces";
import { Contact } from "./Contact";
import { useSocketEventListener } from "@/shared/hooks/useSocketEventListener";
import { useState } from "react";

export interface IUpdateLastMessage {
  contactId: string;
  lastMessage: string;
  receivedAt: number;
}

export function ContactListBody({ messages }: ILastMessageResult) {
  const [data, setData] = useState<ILastMessageResult["messages"]>(messages);

  useSocketEventListener(
    "update-last-message",
    ({ contactId, lastMessage }: IUpdateLastMessage) => {
      const updatedData = data?.map((message) => {
        if (message.contact.phone === contactId) {
          return {
            ...message,
            lastMessage,
          };
        }

        return message;
      });

      setData(updatedData);
    }
  );

  return (
    <>
      {data?.map((message) => (
        <Contact
          id={message.id}
          key={message.id}
          username={message?.contact?.name}
          lastMessage={message.lastMessage}
        />
      ))}
    </>
  );
}
