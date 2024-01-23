export interface ICreateMessageDTO {
  id: string;
  message: string;
  phone: string;
  pushName: string;
  fromMe: boolean;
  timestamp: number;
  chatId?: string;
}
