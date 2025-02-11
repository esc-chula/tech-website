-- CreateEnum
CREATE TYPE "HackathonTicketType" AS ENUM ('DESIGNER', 'DEVELOPER', 'PRODUCT', 'GENERAL');

-- CreateEnum
CREATE TYPE "HackathonRole" AS ENUM ('DEVELOPER', 'DESIGNER', 'PRODUCT');

-- CreateTable
CREATE TABLE "HackathonTicket" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "ticketType" "HackathonTicketType" NOT NULL,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "groupTicketId" INTEGER,

    CONSTRAINT "HackathonTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonGroupTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HackathonGroupTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonRegistration" (
    "id" SERIAL NOT NULL,
    "groupTicketId" INTEGER NOT NULL,

    CONSTRAINT "HackathonRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonTeamMember" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "pronoun" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "role" "HackathonRole" NOT NULL,
    "foodRestriction" TEXT,
    "medication" TEXT,
    "medicalCondition" TEXT,

    CONSTRAINT "HackathonTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackathonTicket_code_key" ON "HackathonTicket"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonGroupTicket_userId_key" ON "HackathonGroupTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonRegistration_groupTicketId_key" ON "HackathonRegistration"("groupTicketId");

-- AddForeignKey
ALTER TABLE "HackathonTicket" ADD CONSTRAINT "HackathonTicket_groupTicketId_fkey" FOREIGN KEY ("groupTicketId") REFERENCES "HackathonGroupTicket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonGroupTicket" ADD CONSTRAINT "HackathonGroupTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonRegistration" ADD CONSTRAINT "HackathonRegistration_groupTicketId_fkey" FOREIGN KEY ("groupTicketId") REFERENCES "HackathonGroupTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTeamMember" ADD CONSTRAINT "HackathonTeamMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "HackathonRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
