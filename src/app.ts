import express from "express";
import userRouter from "./routes/router";
import { errorHandler } from "./utils/error";
import cors from "cors";
import { metricsEndpoint, metricsMiddleware } from "./middleware/metrics";

const app = express();

app.use(express.json());
app.use(cors());
app.use(metricsMiddleware);
app.use("/api", userRouter);
app.get("/metrics", metricsEndpoint);
app.use(errorHandler);

export default app;
