import sql from "mssql";
import { QuarterlyVibesUser } from "../../lib/db/QuarterlyVibesUser";

const GET_USER_BY_REFRESH_TOKEN_SQL = `
SELECT *
FROM QuarterlyVibesUser
WHERE SpotifyRefreshToken = @refreshToken`;

export const settingsMiddleware = async (req, res, next) => {
  const refreshToken = req.get("x-spotify-refresh-token");

  if (!refreshToken) {
    console.log(
      "Settings middleware call received without refresh token. Redirecting..."
    );
    return res.redirect(process.env.FRONTEND_DOMAIN + "/");
  }

  const { resultSet } = await connectAndQuery(GET_USER_BY_REFRESH_TOKEN_SQL, [
    {
      key: "refreshToken",
      type: sql.VarChar,
      value: refreshToken,
    },
  ]);

  if (resultSet?.length !== 1) {
    console.log("Unexpected results for refresh token. Redirecting...");
    return res.redirect(process.env.FRONTEND_DOMAIN + "/");
  }

  res.locals.quarterlyVibesUser = new QuarterlyVibesUser(resultSet[0]);
  next();
};
