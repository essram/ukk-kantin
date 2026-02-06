-- CreateTable
CREATE TABLE `PaymentMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(50) NOT NULL,
    `tipe` ENUM('CASH', 'VIRTUAL', 'DEBIT') NOT NULL,
    `logo` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_order` INTEGER NOT NULL,
    `id_method` INTEGER NOT NULL,
    `uang_masuk` DECIMAL(10, 2) NOT NULL,
    `va` VARCHAR(20) NULL,
    `nomor_kartu` VARCHAR(19) NULL,
    `status` ENUM('BELUM_DIBAYAR', 'LUNAS', 'CANCELED') NOT NULL DEFAULT 'BELUM_DIBAYAR',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payment_order` ADD CONSTRAINT `payment_order_id_method_fkey` FOREIGN KEY (`id_method`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
