import express from "express";
import authRouter from "./auth/index.js";
import settingRouter from "./settings/index.js";

const app = express();

app.use("/auth", authRouter);
app.use("/setting", settingRouter);

export default app;
