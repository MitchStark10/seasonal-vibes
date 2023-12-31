import sql from "mssql";
import { QuarterlyVibesUser } from "../db/QuarterlyVibesUser.js";
import { connectAndQuery } from "../db/connectAndQuery.js";

const GET_USER_BY_REFRESH_TOKEN_SQL = `
SELECT Email, IsSubscribed, SpotifyId, SpotifyRefreshToken
FROM QuarterlyVibesUser
WHERE SpotifyRefreshToken = @refreshToken`;

export const authMiddleware = async (req, res, next) => {
  const refreshToken = req.get("x-spotify-refresh-token");

  console.log("Entered settings middleware", refreshToken);

  if (!refreshToken) {
    console.log(
      "Settings middleware call received without refresh token. Redirecting..."
    );
    return res.status(401).json({ error: "No refresh token provided." });
  }

  const start = Date.now();

  const { resultSet } = await connectAndQuery(GET_USER_BY_REFRESH_TOKEN_SQL, [
    {
      key: "refreshToken",
      type: sql.VarChar,
      value: refreshToken,
    },
  ]);

  const end = Date.now();
  console.log(`Execution time of middlware query: ${end - start} ms`);

  if (resultSet?.length !== 1) {
    console.log("Unexpected results for refresh token.");
    res.cookie("spotifyRefreshToken", "", {});
    return res.status(401).json({ error: "Invalid refresh token." });
  }

  const userData = resultSet[0];

  res.locals.quarterlyVibesUser = new QuarterlyVibesUser({
    email: userData.Email,
    userId: userData.SpotifyId,
    refreshToken: userData.SpotifyRefreshToken,
    isSubscribed: userData.IsSubscribed,
  });

  next();
};
