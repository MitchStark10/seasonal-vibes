import { connectAndQuery } from "./connectAndQuery.js";
import { QuarterlyVibesUser } from "./QuarterlyVibesUser.js";
import dotenv from "dotenv";
dotenv.config();

const IS_PRODUCTION_RUN = process.env.IS_PRODUCTION_RUN === "true";

const FIND_ALL_USERS_SQL = IS_PRODUCTION_RUN
  ? `
SELECT * FROM QuarterlyVibesUser
WHERE IsSubscribed = 1;
`
  : `
SELECT * FROM QuarterlyVibesUser
WHERE IsSubscribed = 1
AND Email = 'mitchstark10@gmail.com'
`;

export class ScheduledPlaylists {
  constructor() {}

  async findAllUsers() {
    const userListResponse = await connectAndQuery(FIND_ALL_USERS_SQL);

    if (userListResponse.err) {
      console.error("error finding all users", userListResponse.err);
      return [];
    }

    return userListResponse.resultSet.map((user) => {
      return new QuarterlyVibesUser({
        email: user.Email,
        userId: user.SpotifyId,
        refreshToken: user.SpotifyRefreshToken,
      });
    });
  }
}
