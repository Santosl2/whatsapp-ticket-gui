import type { ILastMessageResult } from "@/shared/interfaces";
import { HttpService } from "@/shared/services/HttpService";
import { Contact } from "./Contact";

export async function ContactsList() {
  const { messages } = await HttpService.getInstance().get<ILastMessageResult>(
    "messages/last-messages"
  );

  return (
    <section className="flex-1">
      {messages.map((message) => (
        <Contact
          id={message.id}
          key={message.id}
          username={message?.contact?.name}
          lastMessage={message.lastMessage}
        />
      ))}
    </section>
  );
}
