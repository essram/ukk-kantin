/*
  Warnings:

  - You are about to drop the column `category` on the `menu` table. All the data in the column will be lost.
  - Added the required column `id_category` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `category`,
    ADD COLUMN `id_category` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
