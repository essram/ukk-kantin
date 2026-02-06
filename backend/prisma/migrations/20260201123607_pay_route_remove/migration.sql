-- DropForeignKey
ALTER TABLE `payment_order` DROP FOREIGN KEY `payment_order_id_method_fkey`;

-- AlterTable
ALTER TABLE `payment_order` MODIFY `id_method` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `payment_order` ADD CONSTRAINT `payment_order_id_method_fkey` FOREIGN KEY (`id_method`) REFERENCES `paymentmethod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
