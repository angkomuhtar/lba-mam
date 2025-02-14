-- CreateTable
CREATE TABLE `Fuel_consumption` (
    `id` VARCHAR(191) NOT NULL,
    `shipId` VARCHAR(191) NOT NULL,
    `fuel_usage` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fuel_consumption` ADD CONSTRAINT `Fuel_consumption_shipId_fkey` FOREIGN KEY (`shipId`) REFERENCES `Ship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
