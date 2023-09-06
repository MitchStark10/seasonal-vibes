import { connectAndQuery } from "./connectAndQuery.js";
import { QuarterlyVibesUser } from "./QuarterlyVibesUser.js";

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

    return userListResponse.resultSet.map((user) => {
      return new QuarterlyVibesUser({
        email: user.Email,
        userId: user.SpotifyId,
        refreshToken: user.SpotifyRefreshToken,
      });
    });
  }
}
