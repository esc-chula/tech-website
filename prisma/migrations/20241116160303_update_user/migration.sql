/*
  Warnings:

  - You are about to drop the column `firstNameEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstNameTh` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastNameEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastNameTh` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleNameEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleNameTh` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstNameEn",
DROP COLUMN "firstNameTh",
DROP COLUMN "lastNameEn",
DROP COLUMN "lastNameTh",
DROP COLUMN "middleNameEn",
DROP COLUMN "middleNameTh";
