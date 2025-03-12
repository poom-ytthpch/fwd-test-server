import request from "supertest";
import app from "../src";

describe("Api Test", () => {
  it("should get products", async () => {
    const res = await request(app).get("/v1/products");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          planCode: "T11A20",
          packageName: "package 1",
          benefit: "200k",
        }),
        expect.objectContaining({
          planCode: "T11A50",
          packageName: "package 2",
          benefit: "500k",
        }),
        expect.objectContaining({
          planCode: "T11AM1",
          packageName: "package 3",
          benefit: "1M",
        }),
      ])
    );
  });

  it("should calculate", async () => {
    const res = await request(app).post("/v1/premium-calculation").send({
      fullName: "Test",
      genderCd: "FEMALE",
      dob: "1983-02-21",
      planCode: "T11A20",
      premiumPerYear: 30000,
      paymentFrequency: "YEARLY",
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      fullName: "Test",
      planCode: "T11A20",
      baseSumAssured: 200000,
      baseAnnualPremium: 30000,
      modalPremium: 30000,
      productTerm: 5,
      premiumPayingTerm: 5,
      paymentFrequencyCd: "YEARLY",
    });
  });

  it("should get insurancePlans", async () => {
    const res = await request(app).get("/v1/insurancePlans");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: "c3ad3f9d-0303-49d5-9b62-57455a27c4fd",
          fullName: "Test",
          planCode: "T11A20",
          baseSumAssured: 200000,
          baseAnnualPremium: 30000,
          modalPremium: 30000,
          productTerm: 5,
          premiumPayingTerm: 5,
          paymentFrequencyCd: "YEARLY",
          createdAt: "2025-03-11T06:51:58.897Z",
          updatedAt: "2025-03-11T06:51:58.897Z",
        },
        {
          id: "164dbfa5-1796-4f5c-9bff-949b03dbc0b8",
          fullName: "Test",
          planCode: "T11A20",
          baseSumAssured: 200000,
          baseAnnualPremium: 30000,
          modalPremium: 30000,
          productTerm: 5,
          premiumPayingTerm: 5,
          paymentFrequencyCd: "YEARLY",
          createdAt: "2025-03-11T06:49:04.325Z",
          updatedAt: "2025-03-11T06:49:04.325Z",
        },
      ])
    );
  });
});
