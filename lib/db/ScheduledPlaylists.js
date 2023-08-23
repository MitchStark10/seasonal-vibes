import { connectAndQuery } from "./connectAndQuery.js";

const FIND_ALL_USERS_SQL = `
SELECT * FROM QuarterlyVibesUser;
`;

export class ScheduledPlaylists {
  constructor() {}

  async findAllUsers() {
    const userList = await connectAndQuery(FIND_ALL_USERS_SQL);
    return userList.map((user) => {
      return new QuarterlyVibesUser({
        email: user.Email,
        refreshToken: user.SpotifyRefreshToken,
      });
    });
  }
}
