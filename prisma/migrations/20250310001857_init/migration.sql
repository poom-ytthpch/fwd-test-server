-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PaymentFrequency" AS ENUM ('YEARLY', 'HALFYEARLY', 'QUARTERLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "planCode" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePlan" (
    "id" TEXT NOT NULL,
    "planCode" TEXT NOT NULL,
    "baseSumAssured" INTEGER NOT NULL,
    "baseAnnualPremium" INTEGER NOT NULL,
    "modalPremium" INTEGER NOT NULL,
    "productTerm" INTEGER NOT NULL,
    "premiumPayingTerm" INTEGER NOT NULL,
    "paymentFrequencyCd" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_planCode_key" ON "Plan"("planCode");

-- AddForeignKey
ALTER TABLE "InsurancePlan" ADD CONSTRAINT "InsurancePlan_planCode_fkey" FOREIGN KEY ("planCode") REFERENCES "Plan"("planCode") ON DELETE RESTRICT ON UPDATE CASCADE;
