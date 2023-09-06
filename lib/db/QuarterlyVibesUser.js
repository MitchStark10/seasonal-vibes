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

const GET_SUBSCRIPTION_SQL = `
SELECT IsSubscribed
FROM QuarterlyVibesUser
WHERE Email = @email
`;

const GET_LATEST_PLAYLIST_SQL = `
SELECT TOP 1 PlaylistId, MonthCreated, YearCreated
FROM PlaylistsCreated
WHERE Email = @email
ORDER BY YearCreated DESC, MonthCreated DESC
`;

const UPDATE_SUBSCRIPTION_SQL = `
UPDATE QuarterlyVibesUser
SET IsSubscribed = @isSubscribed
WHERE Email = @email
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
      userEmail: this.email,
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

  async getSettings() {
    const subscriptionResponsePromise = connectAndQuery(
      GET_SUBSCRIPTION_SQL,
      [this.emailQueryParam],
      { logInfo: true }
    );

    const latestPlaylistResponsePromise = connectAndQuery(
      GET_LATEST_PLAYLIST_SQL,
      [this.emailQueryParam],
      { logInfo: true }
    );

    const [subscriptionResponse, latestPlaylistResponse] = await Promise.all([
      subscriptionResponsePromise,
      latestPlaylistResponsePromise,
    ]);

    const isSubscribed = subscriptionResponse.resultSet[0]?.IsSubscribed;
    const latestPlaylistMonth =
      latestPlaylistResponse.resultSet[0]?.MonthCreated;
    const latestPlaylistYear = latestPlaylistResponse.resultSet[0]?.YearCreated;
    const today = new Date();

    const nextPlaylistCreationDate = new Date(
      latestPlaylistYear || today.getFullYear(),
      latestPlaylistMonth || today.getMonth() + 1,
      0
    ).toLocaleDateString("en-US");

    return {
      isSubscribed,
      nextPlaylistCreationDate,
    };
  }

  async updateSettings({ isSubscribed }) {
    return connectAndQuery(UPDATE_SUBSCRIPTION_SQL, [
      {
        key: "isSubscribed",
        type: sql.Bit,
        value: isSubscribed,
      },
      this.emailQueryParam,
    ]);
  }
}
