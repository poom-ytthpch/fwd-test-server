import expores, { Request, response, Response } from "express";
import cors from "cors";
import axios from "axios";
import http from "http";
import { routers } from "./routes/api";

const app = expores();
app.use(cors());

const PORT = 8000;

app.use("/v1", routers);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
