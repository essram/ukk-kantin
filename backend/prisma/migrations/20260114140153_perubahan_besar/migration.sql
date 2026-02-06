/*
  Warnings:

  - You are about to drop the column `table_number` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(3))`.
  - You are about to drop the `nomormeja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_siswa` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_stan` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_tableNumber_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_detail` DROP FOREIGN KEY `transaction_detail_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_detail` DROP FOREIGN KEY `transaction_detail_orderId_fkey`;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `id_stan` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `table_number`,
    ADD COLUMN `id_siswa` INTEGER NOT NULL,
    ADD COLUMN `id_stan` INTEGER NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'PREPARED', 'DELIVERY', 'DELIVERED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN_STAN', 'SISWA') NOT NULL DEFAULT 'SISWA';

-- DropTable
DROP TABLE `nomormeja`;

-- DropTable
DROP TABLE `transaction_detail`;

-- CreateTable
CREATE TABLE `transaction_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `menuId` INTEGER NULL,
    `orderId` INTEGER NULL,

    UNIQUE INDEX `transaction_detail_uuid_key`(`uuid`),
    INDEX `transaction_detail_menuId_fkey`(`menuId`),
    INDEX `transaction_detail_orderId_fkey`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(15) NOT NULL,
    `foto` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `siswa_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_stan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nama_pemilik` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `admin_stan_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_diskon` VARCHAR(50) NOT NULL,
    `peresentase_diskon` INTEGER NOT NULL,
    `tanggal_awal` DATETIME(3) NOT NULL,
    `tanggal_akhir` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_diskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_menu` INTEGER NOT NULL,
    `id_diskon` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_id_stan_fkey` FOREIGN KEY (`id_stan`) REFERENCES `admin_stan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_id_stan_fkey` FOREIGN KEY (`id_stan`) REFERENCES `admin_stan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_stan` ADD CONSTRAINT `admin_stan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
