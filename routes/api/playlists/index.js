import express from "express";
import { authMiddleware } from "../../../lib/middleware/authMiddleware.js";

const app = express();

app.use(authMiddleware);

app.post("/", async (req, res) => {
  await res.locals.quarterlyVibesUser.createScheduledPlaylist(req.body);
  res.status(200).json({ success: true, message: "Playlist created." });
});

export default app;
