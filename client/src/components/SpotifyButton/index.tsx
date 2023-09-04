import { Button, styled } from "@mui/material";
import { SpotifyLogo } from "./SpotifyLogo";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || "/auth/login";

const StyledButtonContainer = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  maxWidth: "250px",
  textDecoration: "none",
});

export const SpotifyButton = () => {
  return (
    <div>
      <StyledButtonContainer variant="contained" href={LOGIN_URL}>
        <b>Log in with</b> <SpotifyLogo />
      </StyledButtonContainer>
    </div>
  );
};
