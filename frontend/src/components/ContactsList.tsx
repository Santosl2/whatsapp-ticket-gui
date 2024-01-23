import type { ILastMessageResult } from "@/shared/interfaces";
import { HttpService } from "@/shared/services/HttpService";
import { Contact } from "./Contact";
import { useSocketEventListener } from "@/shared/hooks/useSocketEventListener";
import { ContactListBody } from "./ContactListBody";

export async function ContactsList() {
  const { messages } = await HttpService.getInstance().get<ILastMessageResult>(
    "messages/last-messages"
  );

  return (
    <section className="flex-1">
      <ContactListBody messages={messages} />
    </section>
  );
}
