import Joi from "joi";

export const premiumCalculationRequestValidate = Joi.object({
  fullName: Joi.string().required(),
  genderCd: Joi.string().valid("MALE", "FEMALE").required(),
  dob: Joi.date().required(),
  planCode: Joi.string().required(),
  premiumPerYear: Joi.number().required(),
  paymentFrequency: Joi.string()
    .valid("YEARLY", "HALFYEARLY", "QUARTERLY", "MONTHLY")
    .required(),
});
