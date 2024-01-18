import { z } from "zod";

export const createMessageSchema = z.object({
  params: z.object({
    chatId: z.string(),
  }),

  body: z.object({
    message: z.string().min(1).max(1000),
  }),
});

export type CreateMessageSchemaDTO = z.infer<typeof createMessageSchema>;
