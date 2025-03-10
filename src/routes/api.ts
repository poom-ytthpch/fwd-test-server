import Express, { Request, Response } from "express";
export const routers = Express.Router();
import rateLimit from "express-rate-limit";

import { ProductsService } from "../services";
import { PremiumCalculationRequest } from "../types";

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 10,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const productsService = new ProductsService();

routers.get("/products", async (req: Request, res: Response) => {
  const { plans, status, message } = await productsService.getProducts();

  if (!plans) {
    res.status(status).json({ message: message });
    return;
  }
  res.status(status).json(plans);
});

routers.post(
  "/premium-calculation",
  limiter,
  async (req: Request, res: Response) => {
    const { insurancePlan, status, message } =
      await productsService.premiumCalculate(req.body);

    if (!insurancePlan) {
      res.status(status).json({ message: message });
      return;
    }
    res.status(status).json(insurancePlan);
  }
);
