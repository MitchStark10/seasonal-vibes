import express from "express";

const app = express();

// TODO: Remove the mocks, and actually build this out
app.get("/settings", (req, res) => {
  res.status(200).json({
    subscribed: true,
    nextPlaylistCreationDate: "2020-12-31T23:59:59.999Z",
  });
});

app.post("/settings", (req, res) => {
  res.status(200).json({
    subscribed: true,
    nextPlaylistCreationDate: "2020-12-31T23:59:59.999Z",
  });
});

export default app;
