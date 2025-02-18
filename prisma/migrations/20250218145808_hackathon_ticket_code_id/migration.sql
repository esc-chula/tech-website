/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `HackathonTicket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `HackathonTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HackathonTicket" ADD COLUMN     "codeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HackathonTicket_codeId_key" ON "HackathonTicket"("codeId");
