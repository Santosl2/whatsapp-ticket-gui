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
  name?: string;
  receivedAt: number | null;
}
[];

export interface ILastMessageResult {
  id: number;
  contact: {
    name: string;
    phone: string;
  } | null;
  lastMessage: string;
}
[];

class MessageUseCaseClass {
  private async findContact(phone: string | number): Promise<Contacts | null> {
    const contact = await prisma.contacts.findFirst({
      where: {
        OR: [
          {
            phone: String(phone),
          },
          {
            id: Number.isNaN(Number(phone)) ? undefined : Number(phone),
          },
        ],
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
    chatId,
    message,
  }: CreateMessageSchemaDTO["body"] &
    CreateMessageSchemaDTO["params"]): Promise<
    proto.WebMessageInfo | undefined
  > {
    try {
      const contact = await this.findContact(chatId);

      if (!contact) return;

      await prisma.lastMessages.update({
        where: {
          id: contact.id,
        },
        data: {
          lastMessage: message,
        },
      });

      const messageSent = await whatsappLib.sock.sendMessage(contact?.phone, {
        text: message,
      });
      return messageSent;
    } catch {
      return {} as proto.WebMessageInfo;
    }
  }

  async execute({
    id,
    phone,
    fromMe,
    message,
    pushName,
    timestamp,
  }: ICreateMessageDTO): Promise<Messages> {
    let contact: Contacts = await this.tryInsertContact(pushName, phone);

    const messageInserted = await prisma.messages.create({
      data: {
        id,
        message,
        receivedAt: timestamp,
        contactId: fromMe ? null : contact?.id,
        chatId: contact?.id,
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
    if (!contactId) return;

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
      select: {
        id: true,
        message: true,
        contactId: true,
        receivedAt: true,
        contact: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        receivedAt: "asc",
      },
    });

    const messagesMapper = messages.map((message) => {
      const {
        id,
        message: messageBody,
        receivedAt,
        contactId,
        contact,
      } = message;

      return {
        id,
        message: messageBody,
        name: contact?.name,
        isFromMe: !contactId,
        receivedAt,
      };
    });

    return messagesMapper;
  }

  async getLastMessages(): Promise<ILastMessageResult[]> {
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
