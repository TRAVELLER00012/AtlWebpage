-- CreateTable
CREATE TABLE `IssuedItemsPending` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dateOfReturn` DATETIME(3) NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IssuedItemsPending` ADD CONSTRAINT `IssuedItemsPending_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IssuedItemsPending` ADD CONSTRAINT `IssuedItemsPending_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
