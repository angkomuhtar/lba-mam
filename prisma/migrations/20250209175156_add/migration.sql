-- DropForeignKey
ALTER TABLE `Fuel_consumption` DROP FOREIGN KEY `Fuel_consumption_shipId_fkey`;

-- DropIndex
DROP INDEX `Fuel_consumption_shipId_fkey` ON `Fuel_consumption`;

-- AddForeignKey
ALTER TABLE `Fuel_consumption` ADD CONSTRAINT `Fuel_consumption_shipId_fkey` FOREIGN KEY (`shipId`) REFERENCES `Ship`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
