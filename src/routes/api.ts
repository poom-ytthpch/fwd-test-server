import Express, { Request, Response } from "express";
export const routers = Express.Router();
import rateLimit from "express-rate-limit";

import { ProductsService } from "../services";
import { PremiumCalculationRequest } from "../types";
import { premiumCalculationRequestValidate } from "../schema";
import { HttpStatusCode } from "axios";
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 5,
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
  [limiter],
  async (req: Request, res: Response) => {
    try {
      const val = await premiumCalculationRequestValidate.validateAsync(
        req.body
      );

      const { insurancePlan, status, message } =
        await productsService.premiumCalculate(val);

      if (!insurancePlan) {
        res.status(status).json({ message: message });
        return;
      }
      res.status(status).json(insurancePlan);
    } catch (error) {
      console.log({ error });
      res.status(HttpStatusCode.BadRequest).json(error);
    }
  }
);

routers.get("/insurancePlans", async (req: Request, res: Response) => {
  const { insurancePlans, status, message } =
    await productsService.insurancePlans();

  if (!insurancePlans) {
    res.status(status).json({ message: message });
    return;
  }
  res.status(status).json(insurancePlans);
});
