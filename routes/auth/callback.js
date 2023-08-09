const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  // TODO: Check the state and store the code
  return res.redirect("http://localhost:3001/auth_success");
});

module.exports = app;
