import got from "got";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

export class SpotifyClient {
  constructor({ userAuthCode = null, refreshToken = null }) {
    this.userAuthCode = userAuthCode;
    this.refreshToken = refreshToken;
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

      this.accessToken = response.access_token;
      this.refreshToken = response.refresh_token;
    } finally {
      return new Promise.resolve();
    }
  }

  async fetchUserData() {
    await this.accessTokenPromise;
    const response = await got("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "*/*",
      },
    }).json();

    return {
      email: response.email,
      refreshToken: this.refreshToken,
    };
  }

  async createScheduledPlaylist() {
    await this.accessTokenPromise;
    throw new Error("Not yet implemented.");
  }
}
