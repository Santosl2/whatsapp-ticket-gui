-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "chatId" INTEGER;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "last_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
