-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "contactId" INTEGER,
    "message" TEXT NOT NULL,
    "receivedAt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_id_key" ON "messages"("id");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
