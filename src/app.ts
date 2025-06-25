import express from "express";
import userRouter from "./routes/router";
import { errorHandler } from "./utils/error";
const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use(errorHandler);

export default app;
