-- CreateTable
CREATE TABLE "last_messages" (
    "id" TEXT NOT NULL,
    "contactId" INTEGER,
    "lastMessage" TEXT NOT NULL,
    "receivedAt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "last_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "last_messages_id_key" ON "last_messages"("id");

-- AddForeignKey
ALTER TABLE "last_messages" ADD CONSTRAINT "last_messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
