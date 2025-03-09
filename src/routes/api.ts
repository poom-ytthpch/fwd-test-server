import Express from "express";
export const routers = Express.Router();

import { ProductsService } from "../services";

const productsService = new ProductsService();

routers.get("/products", async(req,res) => {
  res.json(await productsService.getProducts());
});
