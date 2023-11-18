-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `number_of_years_in_atl` INTEGER NOT NULL,
    `phonenumber` INTEGER NOT NULL,
    `bus_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
