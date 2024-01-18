import { Request, Response } from "express";
import { CreateMessageSchemaDTO } from "@schemas/create-message-schema";
import { MessageUseCase } from "@useCase/message-use-case";
import { GetMessageSchemaDTO } from "@schemas/get-message-schema";

class MessageControllerClass {
  async index(req: Request, res: Response): Promise<Response> {
    const { chatId } = req.params as GetMessageSchemaDTO;

    const data = await MessageUseCase.getMessagesByChatId(+chatId);

    return res.json({ messages: data });
  }

  async getLastMessage(req: Request, res: Response): Promise<Response> {
    const data = await MessageUseCase.getLastMessages();

    return res.json({ messages: data });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { message, jid } = req.body as CreateMessageSchemaDTO;

    const data = await MessageUseCase.sendMessageSocket({
      message,
      jid,
    });

    return res.json({ message: data });
  }
}
export const MessageController = new MessageControllerClass();
