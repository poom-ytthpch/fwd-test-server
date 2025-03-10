import { Plan, PremiumCalculationRequest } from "../types";
import axios from "axios";
import ioredis from "ioredis";
import { PrismaService } from "../common/prisma/prisma.service";
export class ProductsService {
  private readonly redis: ioredis;
  private readonly repos: PrismaService;

  constructor() {
    this.redis = new ioredis();
    this.repos = new PrismaService();
  }

  async getProducts(): Promise<Plan[]> {
    const url = process.env.BASE_URL + "/getProducts" || undefined;

    if (!url) {
      return [];
    }

    const cacheKey = `cache:${url}`;
    const cacheTTL = 60 * 1;

    try {
      const cachedData = await this.redis.get(cacheKey);

      if (cachedData) {
        console.log("Data from cache");
        return JSON.parse(cachedData);
      }

      const plans = await axios.get(url).then((response) => {
        return response.data as Plan[];
      });

      const upserPlans = await this.upsertPlan(plans);

      await this.redis.set(
        cacheKey,
        JSON.stringify(upserPlans),
        "EX",
        cacheTTL
      );

      return upserPlans;
    } catch (error) {
      throw error;
    }
  }

  async premiumCalculate(input: PremiumCalculationRequest) {
    const url = process.env.BASE_URL + "/premium-calculation" || undefined;

    console.log({ input });

    // const {} = input

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
