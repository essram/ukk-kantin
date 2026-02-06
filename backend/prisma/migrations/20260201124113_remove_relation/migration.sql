/*
  Warnings:

  - You are about to drop the `payment_order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment_order` DROP FOREIGN KEY `payment_order_id_method_fkey`;

-- DropForeignKey
ALTER TABLE `payment_order` DROP FOREIGN KEY `payment_order_id_order_fkey`;

-- DropTable
DROP TABLE `payment_order`;

-- CreateTable
CREATE TABLE `PaymentOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_order` INTEGER NOT NULL,
    `id_method` INTEGER NULL,
    `uang_masuk` DECIMAL(10, 2) NULL,
    `va` VARCHAR(20) NULL,
    `nomor_kartu` VARCHAR(19) NULL,
    `status` ENUM('BELUM_DIBAYAR', 'LUNAS', 'CANCELED', 'BELUM_LUNAS') NOT NULL DEFAULT 'BELUM_DIBAYAR',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `PaymentOrder_id_order_key`(`id_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentOrder` ADD CONSTRAINT `PaymentOrder_id_method_fkey` FOREIGN KEY (`id_method`) REFERENCES `paymentmethod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentOrder` ADD CONSTRAINT `PaymentOrder_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
