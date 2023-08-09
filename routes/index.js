const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.get("/ping", (_req, res) => {
  res
    .status(200)
    .json({ message: "API request succeeded. May the force be with you." });
});

app.use(express.static(path.join(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
