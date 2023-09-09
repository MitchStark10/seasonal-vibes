import express from "express";
import { QuarterlyVibesUser } from "../../lib/db/QuarterlyVibesUser.js";
import { RequestState } from "../../lib/db/RequestState.js";
import { SpotifyClient } from "../../lib/spotify/SpotifyClient.js";

const app = express();

app.get("/", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = req.query.error || null;

  if (error) {
    console.log("Recevied error from spotify", error);
    return res.redirect(process.env.FRONTEND_DOMAIN + "/accessDenied");
  }

  const requestState = new RequestState(state);
  const { resultSet: requestStateQueryResults } = await requestState.find();

  if (requestStateQueryResults.length < 1) {
    console.log("Unexpeced request state response", requestStateQueryResults);
    return res.redirect(process.env.FRONTEND_DOMAIN + "/accessDenied");
  }

  const spotifyClient = new SpotifyClient({
    userAuthCode: code,
  });
  const userData = await spotifyClient.fetchUserData();
  const user = new QuarterlyVibesUser(userData);
  await user.persist();

  res.cookie("spotifyRefreshToken", userData.refreshToken, {});
  return res.redirect(process.env.FRONTEND_DOMAIN + "/settings");
});

export default app;
