/*
  Warnings:

  - You are about to drop the column `createdBy` on the `InsurancePlan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `InsurancePlan` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "InsurancePlan" DROP COLUMN "createdBy",
DROP COLUMN "updatedBy";

-- DropTable
DROP TABLE "User";
