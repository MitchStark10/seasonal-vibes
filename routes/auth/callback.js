const express = require("express");
const app = express();

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + process.env.CLIENT_SECRET).toString(
          "base64"
        ),
    },
    json: true,
  };

  return res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
