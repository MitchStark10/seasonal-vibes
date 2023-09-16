import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Logo } from "../components/Logo";
import { SpotifyButton } from "../components/SpotifyButton";
import { useWindowSize } from "../hooks/useWindowSize";
import desktopExamplePlaylistImage from "./playlistExampleDesktop.png";
import mobileExamplePlaylistImage from "./playlistExampleMobile.png";

const ContentContainer = styled("div")({
  marginTop: "40px",
  padding: "0 20px",
  textAlign: "center",
});

const CenteredH1 = styled("h1")({
  textAlign: "center",
  display: "none",
});

const CenteredDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ImageWithRoundedCorners = styled("img")({
  borderRadius: "10px",
  maxWidth: "calc(100vw - 40px)",
});

export const Home = () => {
  const [width] = useWindowSize();
  return (
    <ContentContainer>
      <CenteredH1>seasonalvibes</CenteredH1>
      <CenteredDiv>
        <Logo size="large" variant="black" />
      </CenteredDiv>
      <CenteredDiv>
        <Typography fontSize="20px" fontWeight="bold" marginBottom="10px">
          seasonalvibes will create a playlist for you at the end of each month
          using your top 25 songs from that month.
        </Typography>
        <ImageWithRoundedCorners
          src={
            width > 900
              ? desktopExamplePlaylistImage
              : mobileExamplePlaylistImage
          }
          alt="Example playlist"
        />
        <Typography fontSize="20px" marginTop="20px" marginBottom="20px">
          To start using seasonalvibes, simply click the &ldquo;Log In With
          Spotify&rdquo; button below!
        </Typography>
        <SpotifyButton />
        <Typography fontSize="20px" marginTop="20px">
          If you ever wish to pause the automatic creation of playlists, make
          sure that you have signed in. Then, click the &ldquo;Settings&rdquo;
          button and unsubscribe.
        </Typography>
      </CenteredDiv>
    </ContentContainer>
  );
};
