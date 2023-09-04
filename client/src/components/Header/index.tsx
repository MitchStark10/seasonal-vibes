import { Button, styled } from "@mui/material";
import { getCookieValue } from "../../lib/getCookieValue";
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
  maxWidth: "1400px",
  margin: "0 auto",
});

const StyledHeaderText = styled("h1")({
  margin: "-5px 0 0 0",
});

const ActionContainer = styled("span")({
  display: "flex",
  gap: "10px",
});

export const Header = () => {
  const refreshToken = getCookieValue("spotifyRefreshToken");

  return (
    <StyledHeaderContainer>
      <ContentContainer>
        <StyledHeaderText>seasonalvibes</StyledHeaderText>
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
