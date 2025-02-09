-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `last_work` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'ready';

-- AlterTable
ALTER TABLE `Ship_operator` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
