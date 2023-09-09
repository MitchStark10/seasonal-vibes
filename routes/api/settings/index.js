import express from "express";
import { settingsMiddleware } from "./settingsMiddleware.js";

const app = express();

app.use(settingsMiddleware);

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
