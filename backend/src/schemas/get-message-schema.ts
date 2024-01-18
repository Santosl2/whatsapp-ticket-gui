import { z } from "zod";

export const getMessageSchema = z.object({
  params: z.object({
    chatId: z.string().min(1).max(1000),
  }),
});

export type GetMessageSchemaDTO = z.infer<typeof getMessageSchema>["params"];
