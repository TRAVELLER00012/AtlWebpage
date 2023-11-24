-- AlterTable
ALTER TABLE `IssuedItems` MODIFY `dateOfIssue` VARCHAR(191) NOT NULL,
    MODIFY `dateOfReturn` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `IssuedItemsPending` MODIFY `dateOfReturn` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Projects` MODIFY `date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SpecialEvents` MODIFY `date` VARCHAR(191) NOT NULL;
