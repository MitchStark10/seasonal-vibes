import express from "express";
import { RequestState } from "../../lib/db/RequestState.js";
import { SpotifyClient } from "../../lib/spotify/SpotifyClient.js";

const app = express();

app.get("/", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  const requestState = new RequestState(state);
  const { resultSet: requestStateQueryResults } = await requestState.find();

  if (requestStateQueryResults.length < 1) {
    return res.state(401).json({ error: "Unable to validate state" });
  }

  const spotifyClient = new SpotifyClient({ userAuthCode: code });

  // TODO: Should we just include this logic in the constructor, to avoid order of operations issues?
  await spotifyClient.getAccessToken();
  await spotifyClient.getUserData();

  // TODO: Return the auth code via a header
  // TODO: Store the code and user email in DB
  return res.redirect("http://localhost:3001/auth_success");
});

export default app;
