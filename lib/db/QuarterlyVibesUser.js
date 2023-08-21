import sql from "mssql";
import { connectAndQuery } from "./connectAndQuery.js";

const SAVE_USER_SQL = `
INSERT INTO QuarterlyVibesUser (Email, SpotifyRefreshToken)
VALUES (@email, @refreshToken)
`;

export class QuarterlyVibesUser {
  constructor({ email, refreshToken }) {
    this.email = email;
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
  }

  async persist() {
    return connectAndQuery(SAVE_USER_SQL, [
      this.emailQueryParam,
      this.refreshTokenQueryParam,
    ]);
  }
}
