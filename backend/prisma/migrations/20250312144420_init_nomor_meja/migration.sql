-- CreateTable
CREATE TABLE `NomorMeja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `NomorMeja_nomor_key`(`nomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
