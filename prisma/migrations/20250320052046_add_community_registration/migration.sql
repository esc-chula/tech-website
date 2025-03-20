/*
  Warnings:

  - A unique constraint covering the columns `[communityRegistrationId]` on the table `HackathonRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HackathonRegistration" ADD COLUMN     "communityRegistrationId" INTEGER;

-- CreateTable
CREATE TABLE "HackathonCommunityRegistration" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "requiredUniversity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HackathonCommunityRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackathonCommunityRegistration_code_key" ON "HackathonCommunityRegistration"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonRegistration_communityRegistrationId_key" ON "HackathonRegistration"("communityRegistrationId");

-- AddForeignKey
ALTER TABLE "HackathonRegistration" ADD CONSTRAINT "HackathonRegistration_communityRegistrationId_fkey" FOREIGN KEY ("communityRegistrationId") REFERENCES "HackathonCommunityRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
