import { Products } from "../types";
import axios from "axios";
export class ProductsService {
  constructor() {}

  async getProducts(): Promise<Products> {
    const protducts = await axios
      .get("https://fgt9jf-8080.csb.app/getProducts")
      .then((response) => {
        console.log({ response: response.data });
        return response.data;
      });

    return protducts;
  }
}
