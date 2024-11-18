-- DropForeignKey
ALTER TABLE "UserShortenedLinkVisitedRecord" DROP CONSTRAINT "UserShortenedLinkVisitedRecord_userShortenedLinkId_fkey";

-- AddForeignKey
ALTER TABLE "UserShortenedLinkVisitedRecord" ADD CONSTRAINT "UserShortenedLinkVisitedRecord_userShortenedLinkId_fkey" FOREIGN KEY ("userShortenedLinkId") REFERENCES "UserShortenedLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
