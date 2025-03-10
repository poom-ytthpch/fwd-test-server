import express from "express";
import cors from "cors";
import { routers } from "./routes/api";

const port = process.env.PORT || 8000;
const api_version = process.env.API_VERSION || "v1";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/"+api_version, routers);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/${api_version}`);
});
