import { Products } from "../types";
import axios from "axios";
import ioredis from "ioredis";
export class ProductsService {
  private readonly redis: ioredis;
  constructor() {
    this.redis = new ioredis();
  }

  async getProducts(): Promise<Products> {
    const url = "https://fgt9jf-8080.csb.app/getProducts";

    const cacheKey = `cache:${url}`;
    const cacheTTL = 60 * 1;

    const cachedData = await this.redis.get(cacheKey);

    if (cachedData) {
      console.log("📌 Data from cache");
      return JSON.parse(cachedData);
    }

    try {
      const protducts = await axios.get(url).then((response) => {
        console.log({ response: response.data });
        return response.data;
      });

      await this.redis.set(cacheKey, JSON.stringify(protducts), "EX", cacheTTL);

      return protducts;
    } catch (error) {
      throw error;
    }
  }
}
