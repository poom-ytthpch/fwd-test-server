/*
  Warnings:

  - Added the required column `createdBy` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InsurancePlan" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
