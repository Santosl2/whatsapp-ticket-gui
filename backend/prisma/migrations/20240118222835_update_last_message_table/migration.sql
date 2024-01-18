/*
  Warnings:

  - The primary key for the `last_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `last_messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "last_messages_id_key";

-- AlterTable
ALTER TABLE "last_messages" DROP CONSTRAINT "last_messages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "last_messages_pkey" PRIMARY KEY ("id");
