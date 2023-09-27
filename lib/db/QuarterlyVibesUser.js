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

const GET_SETTINGS_SQL = `
SELECT IsSubscribed, PlaylistVisibilityType
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
  constructor({ email, userId, refreshToken, settingsCache }) {
    this.email = email;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.settingsCache = settingsCache;
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
    const start = Date.now();
    console.log(
      "Checking is able to skip subscription promise: ",
      this.isSubscribed
    );
    const settingsResponsePromise = this.isSubscribed
      ? Promise.resolve({ resultSet: [this.settingsCache] })
      : connectAndQuery(GET_SETTINGS_SQL, [this.emailQueryParam], {
          logInfo: true,
        });

    const latestPlaylistResponsePromise = connectAndQuery(
      GET_LATEST_PLAYLIST_SQL,
      [this.emailQueryParam],
      { logInfo: true }
    );

    const [settingsResponse, latestPlaylistResponse] = await Promise.all([
      settingsResponsePromise,
      latestPlaylistResponsePromise,
    ]);

    const end = Date.now();
    console.log(`Execution time of getSettings query: ${end - start} ms`);

    const isSubscribed = settingsResponse.resultSet[0]?.IsSubscribed;
    const playlistVisibilityType =
      settingsResponse.resultSet[0]?.PlaylistVisibilityType;
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
      playlistVisibilityType,
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
