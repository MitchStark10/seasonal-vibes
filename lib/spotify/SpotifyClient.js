import got from "got";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

export class SpotifyClient {
  constructor({ userAuthCode }) {
    this.userAuthCode = userAuthCode;
    this.accessToken = null;
    this.refreshToken = null;
  }

  async fetchAccessToken() {
    const response = await got
      .post("https://accounts.spotify.com/api/token", {
        form: {
          code: this.userAuthCode,
          grant_type: "authorization_code",
          redirect_uri,
        },
        headers: {
          Accept: "*/*",
          charset: "utf-8",
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      })
      .json();

    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;
  }

  async fetchUserData() {
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
}
