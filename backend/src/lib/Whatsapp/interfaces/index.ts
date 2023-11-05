export interface IWhatsapp {
  connect(): Promise<void>;
  init(): Promise<void>;
  listenEvents(): Promise<void>;
}
