import sql from "mssql";
import { QuarterlyVibesUser } from "../../lib/db/QuarterlyVibesUser.js";
import { connectAndQuery } from "../../lib/db/connectAndQuery.js";

const GET_USER_BY_REFRESH_TOKEN_SQL = `
SELECT *
FROM QuarterlyVibesUser
WHERE SpotifyRefreshToken = @refreshToken`;

export const settingsMiddleware = async (req, res, next) => {
  const refreshToken = req.get("x-spotify-refresh-token");

  console.log("Entered settings middleware", refreshToken);

  if (!refreshToken) {
    console.log(
      "Settings middleware call received without refresh token. Redirecting..."
    );
    return res.status(401).json({ error: "No refresh token provided." });
  }

  const { resultSet } = await connectAndQuery(GET_USER_BY_REFRESH_TOKEN_SQL, [
    {
      key: "refreshToken",
      type: sql.VarChar,
      value: refreshToken,
    },
  ]);

  if (resultSet?.length !== 1) {
    console.log("Unexpected results for refresh token.");
    return res.status(401).json({ error: "Invalid refresh token." });
  }

  const userData = resultSet[0];

  res.locals.quarterlyVibesUser = new QuarterlyVibesUser({
    email: userData.Email,
    userId: userData.SpotifyUserId,
    refreshToken: userData.SpotifyRefreshToken,
  });

  next();
};
