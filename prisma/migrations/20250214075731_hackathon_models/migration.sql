-- CreateEnum
CREATE TYPE "HackathonTicketType" AS ENUM ('DESIGNER', 'DEVELOPER', 'PRODUCT', 'GENERAL');

-- CreateEnum
CREATE TYPE "HackathonRole" AS ENUM ('DEVELOPER', 'DESIGNER', 'PRODUCT');

-- CreateTable
CREATE TABLE "HackathonTicket" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "ticketType" "HackathonTicketType" NOT NULL,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "teamTicketId" INTEGER,

    CONSTRAINT "HackathonTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonTicketClaim" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3),

    CONSTRAINT "HackathonTicketClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonTeamTicket" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HackathonTeamTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonRegistration" (
    "id" SERIAL NOT NULL,
    "teamTicketId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,

    CONSTRAINT "HackathonRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonTeamMember" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "HackathonTicketClaim_ticketId_userId_key" ON "HackathonTicketClaim"("ticketId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonTeamTicket_publicId_key" ON "HackathonTeamTicket"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonTeamTicket_userId_key" ON "HackathonTeamTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonRegistration_teamTicketId_key" ON "HackathonRegistration"("teamTicketId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonTeamMember_publicId_key" ON "HackathonTeamMember"("publicId");

-- AddForeignKey
ALTER TABLE "HackathonTicket" ADD CONSTRAINT "HackathonTicket_teamTicketId_fkey" FOREIGN KEY ("teamTicketId") REFERENCES "HackathonTeamTicket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTicketClaim" ADD CONSTRAINT "HackathonTicketClaim_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "HackathonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTicketClaim" ADD CONSTRAINT "HackathonTicketClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTeamTicket" ADD CONSTRAINT "HackathonTeamTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonRegistration" ADD CONSTRAINT "HackathonRegistration_teamTicketId_fkey" FOREIGN KEY ("teamTicketId") REFERENCES "HackathonTeamTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTeamMember" ADD CONSTRAINT "HackathonTeamMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "HackathonRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
