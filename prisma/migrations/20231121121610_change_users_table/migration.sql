/*
  Warnings:

  - Made the column `phonenumber` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `section` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phonenumber` INTEGER NOT NULL,
    MODIFY `class` INTEGER NOT NULL,
    MODIFY `section` VARCHAR(191) NOT NULL;
