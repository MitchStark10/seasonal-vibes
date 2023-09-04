import { Button, css, styled } from "@mui/material";
import { SpotifyLogo } from "./SpotifyLogo";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || "/auth/login";

export const SpotifyButton = () => {
  return (
    <div>
      <p>Get started with: </p>
      <Button variant="contained" href={LOGIN_URL}>
        <SpotifyLogo />
      </Button>
    </div>
  );
};
