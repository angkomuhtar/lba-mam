-- DropForeignKey
ALTER TABLE `Ship_operator` DROP FOREIGN KEY `Ship_operator_shipId_fkey`;

-- AddForeignKey
ALTER TABLE `Ship_operator` ADD CONSTRAINT `Ship_operator_shipId_fkey` FOREIGN KEY (`shipId`) REFERENCES `Ship`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
