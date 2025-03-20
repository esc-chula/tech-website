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

-- CreateTable
CREATE TABLE "HackathonCommunityTeam" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "communityRegistrationId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HackathonCommunityTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonCommunityTeamMember" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "pronoun" "HackathonPronoun" NOT NULL,
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
    "chestSize" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HackathonCommunityTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackathonCommunityRegistration_code_key" ON "HackathonCommunityRegistration"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonCommunityTeam_publicId_key" ON "HackathonCommunityTeam"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonCommunityTeam_communityRegistrationId_key" ON "HackathonCommunityTeam"("communityRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonCommunityTeamMember_publicId_key" ON "HackathonCommunityTeamMember"("publicId");

-- AddForeignKey
ALTER TABLE "HackathonCommunityTeam" ADD CONSTRAINT "HackathonCommunityTeam_communityRegistrationId_fkey" FOREIGN KEY ("communityRegistrationId") REFERENCES "HackathonCommunityRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonCommunityTeamMember" ADD CONSTRAINT "HackathonCommunityTeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "HackathonCommunityTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
