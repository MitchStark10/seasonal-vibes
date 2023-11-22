import { connectAndQuery } from "./connectAndQuery.js";
import { QuarterlyVibesUser } from "./QuarterlyVibesUser.js";

const IS_PROD_RUN = process.env.IS_PRODUCTION === "true";

const FIND_ALL_USERS_SQL = `
SELECT * FROM QuarterlyVibesUser
WHERE IsSubscribed = 1;
`;

export class ScheduledPlaylists {
  constructor() {}

  async findAllUsers() {
    const userListResponse = await connectAndQuery(FIND_ALL_USERS_SQL);

    if (userListResponse.err) {
      console.error("error finding all users", userListResponse.err);
      return [];
    }

    return userListResponse.resultSet
      .filter((user) => {
        if (!IS_PROD_RUN) {
          const devRunEmail = process.env.DEV_RUN_EMAIL;

          if (!devRunEmail) {
            throw new Error("Missing environment variable: DEV_RUN_EMAIL");
          }

          return user.Email === devRunEmail;
        }

        return true;
      })
      .map((user) => {
        return new QuarterlyVibesUser({
          email: user.Email,
          userId: user.SpotifyId,
          refreshToken: user.SpotifyRefreshToken,
        });
      });
  }
}
