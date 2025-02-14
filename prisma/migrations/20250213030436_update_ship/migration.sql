-- AlterTable
ALTER TABLE `Ship` MODIFY `start_date` VARCHAR(191) NOT NULL,
    MODIFY `end_date` VARCHAR(191) NULL DEFAULT '';
