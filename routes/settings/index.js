import express from "express";
import { settingsMiddleware } from "./settingsMiddleware";

const app = express();

app.use(settingsMiddleware);

// TODO: Remove the mocks, and actually build this out
app.get("/", (req, res) => {
  res.status(200).json({
    isSubscribed: res.locals.quarterlyVibesUser.isSubscribed,
    nextPlaylistCreationDate:
      res.locals.quarterlyVibesUser.nextPlaylistCreationDate,
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    subscribed: true,
    nextPlaylistCreationDate: "2020-12-31T23:59:59.999Z",
  });
});

export default app;
