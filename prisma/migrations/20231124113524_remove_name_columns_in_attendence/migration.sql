/*
  Warnings:

  - You are about to drop the column `firstName` on the `Attendence` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Attendence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Attendence` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`;
