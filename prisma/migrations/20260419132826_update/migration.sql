/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `clienteprisma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clienteprisma` DROP COLUMN `data_criacao`,
    ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
