import { Request, Response } from "express";
import { CreateMessageSchemaDTO } from "@schemas/create-message-schema";
import SchemaValidationError from "errors/schema-validator-error";

class CreateMessageControllerClass {
  async index(req: Request, res: Response): Promise<Response> {
    const { message } = req.body as CreateMessageSchemaDTO;

    return res.json({ message: "Hello World" });
  }
}
export const CreateMessageController = new CreateMessageControllerClass();
