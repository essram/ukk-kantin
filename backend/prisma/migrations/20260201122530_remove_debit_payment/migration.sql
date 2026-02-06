/*
  Warnings:

  - The values [DEBIT] on the enum `paymentmethod_tipe` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `paymentmethod` MODIFY `tipe` ENUM('CASH', 'VIRTUAL') NOT NULL;
