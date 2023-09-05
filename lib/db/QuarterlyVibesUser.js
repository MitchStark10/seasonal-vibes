import sql from "mssql";
import { SpotifyClient } from "../spotify/SpotifyClient.js";
import { connectAndQuery } from "./connectAndQuery.js";

const SAVE_USER_SQL = `
IF EXISTS (SELECT * FROM QuarterlyVibesUser WHERE Email = @email)
BEGIN
  UPDATE QuarterlyVibesUser
  SET SpotifyRefreshToken = @refreshToken, SpotifyId = @userId
  WHERE Email = @email
END
ELSE
BEGIN
  INSERT INTO QuarterlyVibesUser (Email, SpotifyRefreshToken, SpotifyId)
  VALUES (@email, @refreshToken, @userId)
END
`;

export class QuarterlyVibesUser {
  constructor({ email, userId, refreshToken }) {
    this.email = email;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.emailQueryParam = {
      key: "email",
      type: sql.VarChar,
      value: this.email,
    };
    this.refreshTokenQueryParam = {
      key: "refreshToken",
      type: sql.VarChar,
      value: this.refreshToken,
    };
    this.userIdParam = {
      key: "userId",
      type: sql.VarChar,
      value: this.userId,
    };
    this.spotifyClient = new SpotifyClient({
      refreshToken: this.refreshToken,
      userId: this.userId,
    });
  }

  async persist() {
    return connectAndQuery(SAVE_USER_SQL, [
      this.emailQueryParam,
      this.refreshTokenQueryParam,
      this.userIdParam,
    ]);
  }

  async createScheduledPlaylist(params) {
    return this.spotifyClient.createScheduledPlaylist(params);
  }
}
