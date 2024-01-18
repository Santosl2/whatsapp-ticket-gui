import { schemaValidatorMiddleware } from "@middlewares/schema-validator";
import { createMessageSchema } from "@schemas/create-message-schema";
import { MessageController } from "@controllers/message-controller";
import { Router } from "express";
import { getMessageSchema } from "@schemas/get-message-schema";

const messagesRoutes = Router();

messagesRoutes.post(
  "/",
  schemaValidatorMiddleware(createMessageSchema),
  MessageController.create
);

messagesRoutes.get("/last-messages", MessageController.getLastMessage);

messagesRoutes.get(
  "/:chatId",
  schemaValidatorMiddleware(getMessageSchema),
  MessageController.index
);
export { messagesRoutes };
