import { SPOTIFY_REFRESH_TOKEN_HEADER_KEY } from "./constants";
import { getCookieValue } from "./getCookieValue";

export const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-spotify-refresh-token": getCookieValue(SPOTIFY_REFRESH_TOKEN_HEADER_KEY),
});
