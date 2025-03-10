export enum Gender {
    MALE,
    FEMALE
}

export enum PaymentFrequency {
    YEARLY,
    HALFYEARLY,
    QUARTERLY,
    MONTHLY
}

export type Plan = {
  id?: string;
  planCode: string;
  packageName: string;
  benefit: string;
};

export type PremiumCalculationRequest = {
    genderCd: Gender;
    dob: string;
    planCode: string;
    premiumPerYear: number;
    paymentFrequency: PaymentFrequency;
}

export type PremiumCalculationResponse = {
    planCode: string;
    baseSumAssured: number;
    baseAnnualPremium: number;
    modalPremium: number;
    productTerm: number;
    premiumPayingTerm: number;
    paymentFrequencyCd: PaymentFrequency;

}