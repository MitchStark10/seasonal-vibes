import { Button, styled } from "@mui/material";
import { SPOTIFY_REFRESH_TOKEN_HEADER_KEY } from "../../lib/constants";
import { getCookieValue } from "../../lib/getCookieValue";
import { Logo } from "../Logo";
import { SpotifyButton } from "../SpotifyButton";

const StyledHeaderContainer = styled("header")({
  borderBottom: "1px solid black",
  color: "white",
  backgroundColor: "black",
  padding: "10px",
});

const ContentContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  maxWidth: "1000px",
  margin: "0 auto",
});

const ActionContainer = styled("span")({
  display: "flex",
  gap: "10px",
});

export const Header = () => {
  const refreshToken = getCookieValue(SPOTIFY_REFRESH_TOKEN_HEADER_KEY);

  return (
    <StyledHeaderContainer>
      <ContentContainer>
        <a href="/">
          <Logo />
        </a>
        <ActionContainer>
          {refreshToken ? (
            <Button variant="contained" href="/settings">
              Settings
            </Button>
          ) : (
            <SpotifyButton />
          )}
          <Button
            variant="outlined"
            href="https://github.com/MitchStark10/quarterly-vibes"
            target="_blank"
          >
            About
          </Button>
        </ActionContainer>
      </ContentContainer>
    </StyledHeaderContainer>
  );
};
