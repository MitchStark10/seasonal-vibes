import cookieParser from "cookie-parser";
import express from "express";
import cron from "node-cron";
import path from "path";
import { createScheduledPlaylist } from "./cron/createScheduledPlaylist.js";
import { __dirname } from "./dirname.js";
import apiRouter from "./routes/api/index.js";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.get("/ping", (_req, res) => {
  res
    .status(200)
    .json({ message: "API request succeeded. May the force be with you." });
});

app.use(express.static(path.join(__dirname, "./client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

cron.schedule("0 8 * * *", async () => {
  const currentDate = new Date();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  if (currentDate.getDate() === lastDayOfMonth) {
    await createScheduledPlaylist();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
