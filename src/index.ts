import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { uploaderConfig } from "./config/uploader_multi";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(uploaderConfig);
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`API live on: ${PORT}`);
});

export default app;
