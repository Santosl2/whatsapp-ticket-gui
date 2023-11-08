import { CreateMessageController } from "controllers/create-message-controller";
import { Router } from "express";

const messagesRoutes = Router();

messagesRoutes.post("/", CreateMessageController.index);

export { messagesRoutes };
