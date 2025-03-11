import {
  getProductsResponse,
  InsurancePlan,
  Plan,
  PremiumCalculationRequest,
  PremiumCalculationResponse,
} from "../types";
import axios, { HttpStatusCode } from "axios";
import { PrismaService } from "../common/prisma/prisma.service";
import { createClient } from "redis";

const client = createClient({
  url: "redis://fwd-redis:6379",
});
export class ProductsService {
  private readonly redis;
  private readonly repos: PrismaService;

  constructor() {
    this.redis = createClient({
      url: `redis://${process.env.REDIS_HOST || "fwd-redis"}:${
        process.env.REDIS_PORT || 6379
      }`,
    });

    this.redis.on("error", (err) => console.error("Redis Client Error", err));

    this.redis.connect(); // ต้องเรียก connect() ก่อนใช้งาน
    this.repos = new PrismaService();
  }

  async getProducts(): Promise<getProductsResponse> {
    const url = process.env.BASE_URL + "/getProducts" || undefined;

    if (!url) {
      return {
        plans: undefined,
        status: HttpStatusCode.NotFound,
        message: "Please set BASE_URL",
      };
    }

    const cacheKey = `cache:${url}`;
    const cacheTTL = 60 * 1;

    try {
      const cachedData = await this.redis.get(cacheKey);

      if (cachedData) {
        console.log("Data from cache");
        return {
          plans: JSON.parse(cachedData),
          status: HttpStatusCode.Ok,
          message: "Success",
        };
      }

      const plans = await axios.get(url).then((response) => {
        return response.data as Plan[];
      });

      const upserPlans = await this.upsertPlan(plans);

      await this.redis.setEx(cacheKey, cacheTTL, JSON.stringify(upserPlans));
      return {
        plans: upserPlans,
        status: HttpStatusCode.Ok,
        message: "Success",
      };
    } catch (error) {
      return {
        plans: undefined,
        status: HttpStatusCode.InternalServerError,
        message: "Error:" + error,
      };
    }
  }

  async premiumCalculate(
    input: PremiumCalculationRequest
  ): Promise<PremiumCalculationResponse> {
    const url = process.env.BASE_URL + "/premium-calculation" || "";

    if (!url) {
      return {
        insurancePlan: undefined,
        status: HttpStatusCode.NotFound,
        message: "Please set BASE_URL",
      };
    }

    try {
      const calculation = await axios
        .post(url, input, {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        })
        .then((response) => {
          return response.data;
        });

      if (calculation) {
        const insurancePlan = await this.repos.insurancePlan.create({
          data: {
            ...calculation,
            fullName: input?.fullName,
          },
          select: {
            fullName: true,
            planCode: true,
            baseSumAssured: true,
            baseAnnualPremium: true,
            modalPremium: true,
            productTerm: true,
            premiumPayingTerm: true,
            paymentFrequencyCd: true,
          },
        });

        await this.redis.del("cache:insurancePlans");

        return {
          insurancePlan: insurancePlan as unknown as InsurancePlan,
          status: HttpStatusCode.Ok,
          message: "Success",
        };
      }

      return calculation;
    } catch (error) {
      return {
        insurancePlan: undefined,
        status: HttpStatusCode.InternalServerError,
        message: "Error:" + error,
      };
    }
  }

  async insurancePlans() {
    const cacheKey = `cache:insurancePlans`;
    const cacheTTL = 60 * 1;

    const cachedData = await this.redis.get(cacheKey);

    try {
      if (cachedData) {
        console.log("Data from cache");
        return {
          insurancePlans: JSON.parse(cachedData),
          status: HttpStatusCode.Ok,
          message: "Success",
        };
      }

      const insurancePlans = await this.repos.insurancePlan.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      await this.redis.setEx(
        cacheKey,
        cacheTTL,
        JSON.stringify(insurancePlans)
      );

      return {
        insurancePlans: insurancePlans,
        status: HttpStatusCode.Ok,
        message: "Success",
      };
    } catch (error) {
      return {
        insurancePlans: undefined,
        status: HttpStatusCode.InternalServerError,
        message: "Error:" + error,
      };
    }
  }

  private async upsertPlan(plans: Plan[]): Promise<Plan[]> {
    let upserPlans = [];

    try {
      for (const plan of plans) {
        upserPlans.push(
          await this.repos.plan.upsert({
            where: {
              planCode: plan?.planCode,
            },
            create: {
              ...plan,
            },
            update: {
              ...plan,
            },
            select: {
              planCode: true,
              packageName: true,
              benefit: true,
            },
          })
        );
      }

      const promise = await Promise.all(upserPlans);

      return promise;
    } catch (error) {
      throw error;
    }
  }
}
