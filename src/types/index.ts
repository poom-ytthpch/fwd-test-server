export enum Gender {
  MALE,
  FEMALE,
}

export enum PaymentFrequency {
  YEARLY,
  HALFYEARLY,
  QUARTERLY,
  MONTHLY,
}

export type Plan = {
  id?: string;
  planCode: string;
  packageName: string;
  benefit: string;
};

export type InsurancePlan = {
  id?: string;
  planCode: string;
  baseSumAssured: number;
  baseAnnualPremium: number;
  modalPremium: number;
  productTerm: number;
  premiumPayingTerm: number;
  paymentFrequencyCd: PaymentFrequency;
  createdAt: Date;
  updatedAt: Date;
};

export type PremiumCalculationRequest = {
  fullName: string;
  genderCd: Gender;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: PaymentFrequency;
};

export type PremiumCalculationResponse = {
  insurancePlan?: InsurancePlan;
  status: number;
  message: string;
};

export type getProductsResponse = {
  plans?: Plan[];
  status: number;
  message: string;
};
