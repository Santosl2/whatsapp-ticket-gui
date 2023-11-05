export interface ICreateMessageDTO {
  id: string;
  message: string;
  from: string;
  pushName: string;
  fromMe: boolean;
  timestamp: number;
}
