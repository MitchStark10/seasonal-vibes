const express = require("express");
const { RequestState } = require("../../lib/db/RequestState");
const app = express();

app.get("/", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  const requestState = new RequestState(state);
  const { resultSet: requestStateQueryResults } = await requestState.find();

  if (requestStateQueryResults.length < 1) {
    return res.state(401).json({ error: "Unable to validate state" });
  }

  // TODO: Store the code and user email in DB
  return res.redirect("http://localhost:3001/auth_success");
});

module.exports = app;
