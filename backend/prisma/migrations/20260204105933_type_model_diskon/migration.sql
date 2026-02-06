/*
  Warnings:

  - You are about to drop the column `peresentase_diskon` on the `diskon` table. All the data in the column will be lost.
  - Added the required column `persentase_diskon` to the `diskon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diskon` DROP COLUMN `peresentase_diskon`,
    ADD COLUMN `persentase_diskon` INTEGER NOT NULL;
