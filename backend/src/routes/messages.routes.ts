import { Router } from "express";

const messagesRoutes = Router();

messagesRoutes.post("/", (request, response) => {
  return response.json({ message: "Mensagem salva com sucesso!" });
});

export { messagesRoutes };
