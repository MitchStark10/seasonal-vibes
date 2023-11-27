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

const GET_GENRE_FILTERS_SQL = `
SELECT Genre
FROM GenreFilters
WHERE Email = @email
`;

const GET_SETTINGS_SQL = `
SELECT IsSubscribed, QuantityOfSongsPerPlaylist
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
SET
  IsSubscribed = @isSubscribed,
  QuantityOfSongsPerPlaylist = @quantityOfSongsPerPlaylist
WHERE Email = @email
`;

const DELETE_USER_PLAYLISTS_SQL = `
DELETE FROM PlaylistsCreated
WHERE Email = @email
`;

const DELETE_USER_SQL = `
DELETE FROM QuarterlyVibesUser
WHERE Email = @email
`;

export class QuarterlyVibesUser {
  constructor({ email, userId, refreshToken, isSubscribed }) {
    this.email = email;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.isSubscribed = isSubscribed;
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
    const settings = await this.getSettings();
    return this.spotifyClient.createScheduledPlaylist({
      ...params,
      quantityOfSongsPerPlaylist: settings.quantityOfSongsPerPlaylist,
    });
  }

  async getSettings() {
    const start = Date.now();
    console.log(
      "Checking is able to skip subscription promise: ",
      this.isSubscribed
    );

    const settingsResponsePromise = connectAndQuery(
      GET_SETTINGS_SQL,
      [this.emailQueryParam],
      {
        logInfo: true,
      }
    );

    const genreFiltersResponsePromise = connectAndQuery(
      GET_GENRE_FILTERS_SQL,
      [this.emailQueryParam],
      {
        logInfo: true
      } 
    );

    const latestPlaylistResponsePromise = connectAndQuery(
      GET_LATEST_PLAYLIST_SQL,
      [this.emailQueryParam],
      { logInfo: true }
    );

    const [settingsResponse, latestPlaylistResponse, genreFiltersResponse] = await Promise.all([
      settingsResponsePromise,
      latestPlaylistResponsePromise,
      genreFiltersResponsePromise
    ]);

    const end = Date.now();
    console.log(`Execution time of getSettings query: ${end - start} ms`);

    const isSubscribed = settingsResponse.resultSet[0]?.IsSubscribed;
    const quantityOfSongsPerPlaylist =
      settingsResponse.resultSet[0]?.QuantityOfSongsPerPlaylist;
    const latestPlaylistMonth =
      latestPlaylistResponse.resultSet[0]?.MonthCreated;
    const latestPlaylistYear = latestPlaylistResponse.resultSet[0]?.YearCreated;
    const genreFilters = genreFiltersResponse.resultSet.map(result => result.Genre);
    const today = new Date();

    const nextPlaylistCreationDate = new Date(
      latestPlaylistYear || today.getFullYear(),
      latestPlaylistMonth || today.getMonth() + 1,
      0
    ).toLocaleDateString("en-US");

    return {
      isSubscribed,
      quantityOfSongsPerPlaylist,
      nextPlaylistCreationDate,
      genreFilters
    };
  }

  async updateSettings({ isSubscribed, quantityOfSongsPerPlaylist }) {
    return connectAndQuery(UPDATE_SUBSCRIPTION_SQL, [
      {
        key: "isSubscribed",
        type: sql.Bit,
        value: isSubscribed,
      },
      {
        key: "quantityOfSongsPerPlaylist",
        type: sql.SmallInt,
        value: quantityOfSongsPerPlaylist,
      },
      this.emailQueryParam,
    ]);
  }

  async _deleteCreatedPlaylists() {
    return connectAndQuery(DELETE_USER_PLAYLISTS_SQL, [this.emailQueryParam]);
  }

  async deleteUser() {
    await this._deleteCreatedPlaylists();
    return connectAndQuery(DELETE_USER_SQL, [this.emailQueryParam]);
  }
}
