export interface IWhatsapp {
  get client(): any;
  connect(): Promise<void>;
  init(): Promise<void>;
  listenEvents(): Promise<void>;
}
