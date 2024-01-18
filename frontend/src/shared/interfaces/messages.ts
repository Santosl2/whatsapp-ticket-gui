interface IMessageResult {
  messages: Message[];
}

interface Message {
  id: string;
  message: string;
  isFromMe: boolean;
  receivedAt: number;
}

export type { IMessageResult };
