import { Request, Response } from "express";
import { CreateMessageSchemaDTO } from "@schemas/create-message-schema";
import { CreateMessageUseCase } from "@useCase/create-message-use-case";

class CreateMessageControllerClass {
  async index(req: Request, res: Response): Promise<Response> {
    const { message, jid } = req.body as CreateMessageSchemaDTO;

    const data = await CreateMessageUseCase.sendMessageSocket({
      message,
      jid,
    });

    return res.json({ message: data });
  }
}
export const CreateMessageController = new CreateMessageControllerClass();
