import { prisma } from "@database/index";
import { Contacts, LastMessages, Messages } from "@prisma/client";
import { CreateMessageSchemaDTO } from "@schemas/create-message-schema";
import { proto } from "@whiskeysockets/baileys";
import { ICreateMessageDTO } from "dto/create-message-dto";
import { whatsappLib } from "../server";

interface IMessageMapperResult {
  id: string;
  message: string;
  isFromMe: boolean;
  receivedAt: number | null;
}
[];

class MessageUseCaseClass {
  private async findContact(phone: string): Promise<Contacts | null> {
    const contact = await prisma.contacts.findFirst({
      where: {
        phone,
      },
    });

    return contact;
  }

  private async tryInsertContact(
    name: string,
    phone: string
  ): Promise<Contacts> {
    const contact = await this.findContact(phone);

    if (contact) return contact;

    const newContact = await prisma.contacts.create({
      data: {
        name,
        phone,
      },
    });

    return newContact;
  }

  async sendMessageSocket({
    jid,
    message,
  }: CreateMessageSchemaDTO): Promise<proto.WebMessageInfo | undefined> {
    try {
      const messageSent = await whatsappLib.sock.sendMessage(jid, {
        text: message,
      });
      return messageSent;
    } catch {
      return {} as proto.WebMessageInfo;
    }
  }

  async execute({
    id,
    from,
    fromMe,
    message,
    pushName,
    timestamp,
  }: ICreateMessageDTO): Promise<Messages> {
    let contact: Contacts = {} as Contacts;

    if (!fromMe) contact = await this.tryInsertContact(pushName, from);

    const messageInserted = await prisma.messages.create({
      data: {
        id,
        message,
        receivedAt: timestamp,
        contactId: contact?.id,
      },
    });

    this.insertIntoLastMessageTable({
      contactId: contact?.id,
      lastMessage: message,
      receivedAt: timestamp,
    });

    return messageInserted;
  }

  private async insertIntoLastMessageTable({
    contactId,
    lastMessage,
    receivedAt,
  }: {
    contactId: number;
    lastMessage: string;
    receivedAt: number;
  }) {
    await prisma.lastMessages.upsert({
      // @ts-ignore
      where: {
        id: contactId,
        contactId,
      },
      update: {
        lastMessage,
        receivedAt,
      },
      create: {
        id: contactId,
        contactId,
        lastMessage,
        receivedAt,
      },
    });
  }

  async getMessagesByChatId(chatId: number): Promise<IMessageMapperResult[]> {
    const messages = await prisma.messages.findMany({
      where: {
        chatId,
      },
      orderBy: {
        receivedAt: "asc",
      },
    });

    const messagesMapper = messages.map((message) => {
      const { id, message: messageBody, receivedAt, contactId } = message;

      return {
        id,
        message: messageBody,
        isFromMe: !contactId,
        receivedAt,
      };
    });

    return messagesMapper;
  }

  async getLastMessages(): Promise<LastMessages[]> {
    const lastMessages = await prisma.lastMessages.findMany({
      select: {
        id: true,
        lastMessage: true,
        contact: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });

    return lastMessages;
  }
}

export const MessageUseCase = new MessageUseCaseClass();
