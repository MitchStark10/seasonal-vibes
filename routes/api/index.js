import express from "express";
import authRouter from "./auth/index.js";
import playlistsRouter from "./playlists/index.js";
import settingRouter from "./settings/index.js";

const app = express();

app.use("/auth", authRouter);
app.use("/settings", settingRouter);
app.use("/playlists", playlistsRouter);

export default app;
