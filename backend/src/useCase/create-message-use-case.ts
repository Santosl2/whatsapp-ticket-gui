import { prisma } from "@database/index";
import { Contacts, Messages } from "@prisma/client";
import { ICreateMessageDTO } from "dto/create-message-dto";

class CreateMessageUseCaseClass {
  private async findContact(name: string): Promise<Contacts> {
    const contact = await prisma.contacts.findFirst({
      where: {
        name,
      },
    });

    return contact;
  }

  private async tryInsertContact(
    name: string,
    phone: string
  ): Promise<Contacts> {
    const contact = await this.findContact(name);

    if (contact) return contact;

    const newContact = await prisma.contacts.create({
      data: {
        name,
        phone,
      },
    });

    return newContact;
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

    return messageInserted;
  }
}

export const CreateMessageUseCase = new CreateMessageUseCaseClass();
