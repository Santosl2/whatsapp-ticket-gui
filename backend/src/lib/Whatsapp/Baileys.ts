import makeWASocket, {
  AuthenticationState,
  DisconnectReason,
  WASocket,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { IWhatsapp } from "./interfaces";
import { Boom } from "@hapi/boom";

class WhatsappBaileys implements IWhatsapp {
  public sock: WASocket = {} as WASocket;
  private auth:
    | {
        state: AuthenticationState;
        saveCreds: () => Promise<void>;
      }
    | undefined = undefined;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.auth = await useMultiFileAuthState("auth_data");
  }

  async connect(): Promise<void> {
    if (!this.auth) await this.init();

    const { state, saveCreds } = this.auth!;
    const sock = makeWASocket({
      printQRInTerminal: true,
      auth: state,
    });

    sock.ev.on("creds.update", saveCreds);
    this.sock = sock;

    this.listenEvents();
  }

  async listenEvents(): Promise<void> {
    const { sock } = this;
    if (!sock) throw new Error("Whatsapp is not connected");

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        console.log(
          "connection closed due to ",
          lastDisconnect?.error,
          ", reconnecting ",
          shouldReconnect
        );

        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === "open") {
        console.log("opened connection");
      }
    });

    sock.ev.on("messages.upsert", async (m) => {
      console.log("message received", m.messages[0].message?.conversation);

      console.log("replying to", m.messages[0].key.remoteJid);
    });
  }
}

export { WhatsappBaileys };
