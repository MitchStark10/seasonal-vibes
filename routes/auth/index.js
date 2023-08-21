import express from "express";
import loginRoutes from "./login.js";
import callbackRoutes from "./callback.js";

const app = express();

app.use("/login", loginRoutes);
app.use("/callback", callbackRoutes);

export default app;
