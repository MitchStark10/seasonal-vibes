import got from "got";
import mssql from "mssql";
import { connectAndQuery } from "../db/connectAndQuery.js";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.BACKEND_DOMAIN + "/api/auth/callback";

const CHECK_FOR_PLAYLIST_SQL = `
SELECT *
FROM PlaylistsCreated
WHERE Email = @email
  AND MonthCreated = @month
  AND YearCreated = @year
`;

const CREATE_PLAYLIST_SQL = `
INSERT INTO PlaylistsCreated (Email, PlaylistId, MonthCreated, YearCreated)
VALUES (@email, @playlistId, @month, @year)
`;

export class SpotifyClient {
  constructor({
    userAuthCode = null,
    refreshToken = null,
    userId = null,
    userEmail = null,
  }) {
    this.userEmail = userEmail;
    this.userAuthCode = userAuthCode;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.accessToken = null;
    this.accessTokenPromise = this._fetchAccessToken();
  }

  async _fetchAccessToken() {
    try {
      if (!this.userAuthCode && !this.refreshToken) {
        throw new Error(
          "Either user code or refresh token is required to fetch access token."
        );
      }

      const formBody = this.refreshToken
        ? {
            grant_type: "refresh_token",
            refresh_token: this.refreshToken,
          }
        : {
            code: this.userAuthCode,
            grant_type: "authorization_code",
            redirect_uri,
          };

      console.log("Preparing to fetch access token", formBody);
      const response = await got
        .post("https://accounts.spotify.com/api/token", {
          form: formBody,
          headers: {
            Accept: "*/*",
            charset: "utf-8",
            Authorization:
              "Basic " +
              new Buffer.from(client_id + ":" + client_secret).toString(
                "base64"
              ),
          },
        })
        .json();

      console.log("Access token received");

      this.accessToken = response.access_token;
      this.refreshToken = response.refresh_token;

      this.defaultHeaders = {
        Authorization: `Bearer ${this.accessToken}`,
      };
    } finally {
      return Promise.resolve();
    }
  }

  async fetchUserData() {
    await this.accessTokenPromise;
    const response = await got("https://api.spotify.com/v1/me", {
      headers: this.defaultHeaders,
    }).json();

    this.userId = response.id;

    return {
      email: response.email,
      refreshToken: this.refreshToken,
      userId: this.userId,
    };
  }

  async getTopTracks() {
    await this.accessTokenPromise;

    console.log("Fetching top tracks for user: ", this.userId);
    const response = await got(
      "https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term",
      {
        headers: this.defaultHeaders,
      }
    ).json();

    console.log("top tracks response", response);

    return response.items.map((item) => ({
      artist: item.artists[0].name,
      name: item.name,
      uri: item.uri,
    }));
  }

  async createPlaylist({ playlistName }) {
    const newPlaylistBody = {
      name: playlistName,
    };

    const createPlaylistUrl = `https://api.spotify.com/v1/users/${this.userId}/playlists`;

    console.log("Creating playlist for user:", this.userId);
    const response = await got
      .post(createPlaylistUrl, {
        json: newPlaylistBody,
        headers: this.defaultHeaders,
      })
      .json();
    console.log("Create playlist response", response);

    if (!response.id) {
      throw new Error(
        "Failed to create playlist. Response: " + JSON.stringify(response)
      );
    }

    connectAndQuery(CREATE_PLAYLIST_SQL, [
      {
        key: "email",
        type: mssql.VarChar,
        value: this.userEmail,
      },
      {
        key: "playlistId",
        type: mssql.VarChar,
        value: response.id,
      },
      {
        key: "month",
        type: mssql.Int,
        value: new Date().getMonth() + 1,
      },
      {
        key: "year",
        type: mssql.Int,
        value: new Date().getFullYear(),
      },
    ]);

    return response.id;
  }

  async populatePlaylist({ playlistId, tracks }) {
    const trackUris = tracks.map((track) => track.uri);

    console.log("Populating playlist with tracks for user: ", this.userId);
    const popualatePlaylistResponse = await got({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      method: "PUT",
      json: {
        uris: trackUris,
      },
      headers: this.defaultHeaders,
    }).json();

    console.log("Populate playlist response", popualatePlaylistResponse);
  }

  async createScheduledPlaylist({ playlistName }) {
    if (!this.userEmail) {
      throw new Error("Cannot create a playlist without email context");
    }
    const playlistResults = await connectAndQuery(CHECK_FOR_PLAYLIST_SQL, [
      {
        key: "email",
        type: mssql.VarChar,
        value: this.userEmail,
      },
      {
        key: "month",
        type: mssql.Int,
        value: new Date().getMonth() + 1,
      },
      {
        key: "year",
        type: mssql.Int,
        value: new Date().getFullYear(),
      },
    ]);

    if (playlistResults.resultSet.length > 0) {
      console.log(
        "Playlist already created for this month.",
        JSON.stringify(playlistResults)
      );
      return;
    }
    await this.accessTokenPromise;
    const tracks = await this.getTopTracks();
    const playlistId = await this.createPlaylist({ playlistName });
    await this.populatePlaylist({ playlistId, tracks });
  }
}
