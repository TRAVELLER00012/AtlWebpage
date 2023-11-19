/*
  Warnings:

  - You are about to drop the column `date` on the `attendence` table. All the data in the column will be lost.
  - Added the required column `day` to the `Attendence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Attendence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Attendence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendence` DROP COLUMN `date`,
    ADD COLUMN `day` INTEGER NOT NULL,
    ADD COLUMN `month` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;
