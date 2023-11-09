import { schemaValidatorMiddleware } from "@middlewares/schema-validator";
import { createMessageSchema } from "@schemas/create-message-schema";
import { CreateMessageController } from "@controllers/create-message-controller";
import { Router } from "express";

const messagesRoutes = Router();

messagesRoutes.post(
  "/",
  schemaValidatorMiddleware(createMessageSchema),
  CreateMessageController.index
);

export { messagesRoutes };
