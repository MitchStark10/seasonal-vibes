import express from "express";
import { authMiddleware } from "../../../lib/middleware/authMiddleware.js";
import deleteUserRoute from "./deleteAccount/index.js";

const app = express();

app.use(authMiddleware);

app.use("deleteAccount", deleteUserRoute);

app.get("/", async (req, res) => {
  const settings = await res.locals.quarterlyVibesUser.getSettings();
  res.status(200).json(settings);
});

app.post("/", async (req, res) => {
  await res.locals.quarterlyVibesUser.updateSettings(req.body);
  const settings = await res.locals.quarterlyVibesUser.getSettings();
  res.status(200).json(settings);
});

export default app;
