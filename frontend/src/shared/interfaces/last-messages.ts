interface ILastMessageResult {
  messages: Message[];
}

interface Message {
  id: number;
  lastMessage: string;
  contact: Contact;
}

interface Contact {
  name: string;
  phone: string;
}

export type { ILastMessageResult };
