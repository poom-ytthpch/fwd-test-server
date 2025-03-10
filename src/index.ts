import express, { Request, response, Response } from "express";
import cors from "cors";
import { routers } from "./routes/api";

const app = express();
app.use(express.json());

app.use(cors());


const PORT = 8000;

app.use("/v1", routers);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
