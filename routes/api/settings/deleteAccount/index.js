import express from "express";

const app = express();

app.delete("/", async (_req, res) => {
  await res.locals.quarterlyVibesUser.deleteUser();
  res.cookie("spotifyRefreshToken", "", {});
  res.status(200).json({ success: true });
});

export default app;
