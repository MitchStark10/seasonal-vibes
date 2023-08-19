class SpotifyClient {
  constructor({ userAuthCode }) {
    this.userAuthCode = userAuthCode;
    this.accessToken = null;
  }

  async getAccessToken() {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    // TODO: Switch over to an actively maintained lib like "got"
    const response = request.post(authOptions);

    if (response.statusCode === 200) {
      this.accessToken = body.access_token;
    }
  }
}
