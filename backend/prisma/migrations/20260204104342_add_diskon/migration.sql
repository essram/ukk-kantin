-- AddForeignKey
ALTER TABLE `menu_diskon` ADD CONSTRAINT `menu_diskon_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_diskon` ADD CONSTRAINT `menu_diskon_id_diskon_fkey` FOREIGN KEY (`id_diskon`) REFERENCES `diskon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
