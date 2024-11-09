-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "oidcId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "firstNameTh" TEXT NOT NULL,
    "middleNameTh" TEXT,
    "lastNameTh" TEXT NOT NULL,
    "firstNameEn" TEXT NOT NULL,
    "middleNameEn" TEXT,
    "lastNameEn" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShortenedLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserShortenedLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShortenedLinkVisitedRecord" (
    "id" SERIAL NOT NULL,
    "utmCampaignSource" TEXT,
    "utmCampaignMedium" TEXT,
    "utmCampaignName" TEXT,
    "utmCampaignId" TEXT,
    "utmCampaignTerm" TEXT,
    "utmCampaignContent" TEXT,
    "userShortenedLinkId" INTEGER NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserShortenedLinkVisitedRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQrCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "logo" TEXT,
    "userId" INTEGER NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserQrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechMonthStamp" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "TechMonthStamp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_oidcId_key" ON "User"("oidcId");

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserShortenedLink_slug_key" ON "UserShortenedLink"("slug");

-- AddForeignKey
ALTER TABLE "UserShortenedLink" ADD CONSTRAINT "UserShortenedLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShortenedLinkVisitedRecord" ADD CONSTRAINT "UserShortenedLinkVisitedRecord_userShortenedLinkId_fkey" FOREIGN KEY ("userShortenedLinkId") REFERENCES "UserShortenedLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQrCode" ADD CONSTRAINT "UserQrCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
