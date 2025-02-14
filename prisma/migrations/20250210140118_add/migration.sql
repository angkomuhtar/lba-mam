-- DropForeignKey
ALTER TABLE `Ship_operator` DROP FOREIGN KEY `Ship_operator_profileId_fkey`;

-- AlterTable
ALTER TABLE `Ship_operator` MODIFY `profileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Ship_operator` ADD CONSTRAINT `Ship_operator_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
