const got = require("got");

class SpotifyClient {
  constructor({ userAuthCode }) {
    this.userAuthCode = userAuthCode;
    this.accessToken = null;
  }

  async getAccessToken() {
    const response = await got.post("https://accounts.spotify.com/api/token", {
      json: {
        code,
        redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    });

    console.log("Access token response", response);

    if (response.statusCode === 200) {
      this.accessToken = body.access_token;
    } else {
      throw new Error(response);
    }
  }

  async getUserData() {
    const response = await got("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log("User data response", response);

    if (response.statusCode === 200) {
      return response.body;
    } else {
      throw new Error(response);
    }
  }
}

module.exports = { SpotifyClient };
