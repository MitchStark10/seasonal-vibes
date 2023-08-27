import express from "express";
import { RequestState } from "../../lib/db/RequestState.js";

const app = express.Router();

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

app.get("/", async (_req, res) => {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email playlist-modify-public user-top-read";

  const requestState = new RequestState(state);
  const newRequestStateResponse = await requestState.persist();

  if (newRequestStateResponse.err) {
    return res.status(500).json({ error: "Unable to persist request state" });
  }

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      }).toString()
  );
});

export default app;
