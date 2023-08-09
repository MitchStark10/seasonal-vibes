const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

router.get("/login", function (_req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

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

router.get("/api", (_req, res) => {
  res
    .status(200)
    .json({ message: "API request succeeded. May the force be with you." });
});

router.use(express.static(path.join(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
router.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = router;
