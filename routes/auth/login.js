const express = require("express");
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

app.get("/", (_req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

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

module.exports = app;
