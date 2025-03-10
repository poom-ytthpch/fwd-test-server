import Express, { Request, Response } from "express";
export const routers = Express.Router();

import { ProductsService } from "../services";

const productsService = new ProductsService();

routers.get("/products", async (req: Request, res) => {
  const plans = await productsService.getProducts();

  if (plans.length <= 0) {
    res.status(404).json({ message: "Products not found" });
    return
  }
  res.status(200).json(plans);
});
