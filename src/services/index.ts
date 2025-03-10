import { Plan, Products } from "../types";
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

  async getProducts(): Promise<Products> {
    const url = "https://fgt9jf-8080.csb.app/getProducts";

    const cacheKey = `cache:${url}`;
    const cacheTTL = 60 * 1;

    const cachedData = await this.redis.get(cacheKey);

    if (cachedData) {
      console.log("Data from cache");
      return JSON.parse(cachedData);
    }

    try {
      const plans = await axios.get(url).then((response) => {
        console.log({ response: response.data });
        return response.data;
      });

      const upserPlans = await this.upsertPlan(plans);

      console.log({ upserPlans });

      await this.redis.set(cacheKey, JSON.stringify(upserPlans), "EX", cacheTTL);

      return plans;
    } catch (error) {
      throw error;
    }
  }

  async upsertPlan(plans: Plan[]): Promise<Plan[]> {
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
