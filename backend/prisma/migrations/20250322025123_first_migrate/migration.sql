/*
  Warnings:

  - You are about to drop the column `payment_method` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `table_number` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `note` on the `transaction_detail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_order]` on the table `payment_order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order` DROP COLUMN `payment_method`,
    ADD COLUMN `dine_in` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `note` TEXT NULL DEFAULT '',
    MODIFY `table_number` INTEGER NOT NULL DEFAULT 0,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `transaction_detail` DROP COLUMN `note`,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `payment_order` ADD COLUMN `email` VARCHAR(191) NULL,
    MODIFY `uang_masuk` DECIMAL(10, 2) NULL,
    MODIFY `status` ENUM('BELUM_DIBAYAR', 'LUNAS', 'CANCELED', 'BELUM_LUNAS') NOT NULL DEFAULT 'BELUM_DIBAYAR';

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `payment_order_id_order_key` ON `payment_order`(`id_order`);

-- AddForeignKey
ALTER TABLE `payment_order` ADD CONSTRAINT `payment_order_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_tableNumber_fkey` FOREIGN KEY (`table_number`) REFERENCES `nomormeja`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
