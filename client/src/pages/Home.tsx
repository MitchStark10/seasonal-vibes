import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { NumberedListItem } from "../components/NumberedListItem";
import { NumberedListItemContainer } from "../components/NumberedListItemContainer";
import { SpotifyButton } from "../components/SpotifyButton";
import { useWindowSize } from "../hooks/useWindowSize";
import desktopExamplePlaylistImage from "./playlistExampleDesktop.png";
import mobileExamplePlaylistImage from "./playlistExampleMobile.png";

const ContentContainer = styled("div")({
  marginTop: "40px",
  padding: "0 20px",
  textAlign: "center",
  maxWidth: "1000px",
  margin: "auto",
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
        <Typography fontSize="36px" fontWeight="bold" marginBottom="10px">
          Personalized, Automated Monthly Playlists
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
          Immortalize your current music mood with automatically generated
          playlists based on your most played songs of each month. Follow these
          two quick and simple steps, and we&apos;ll take care of creating your
          playlist on the final day of every month!
        </Typography>
        <NumberedListItemContainer>
          <NumberedListItem number={1}>
            Sign in with Spotify using the link below
          </NumberedListItem>
          <NumberedListItem number={2}>
            (Optionally) Personalize your settings
          </NumberedListItem>
        </NumberedListItemContainer>
        <SpotifyButton />
      </CenteredDiv>
      <Typography
        fontSize="24px"
        fontWeight="bold"
        marginTop="40px"
        marginBottom="10px"
      >
        Browse some real playlists generated by seasonalvibes
      </Typography>
      <iframe
        style={{ borderRadius: "12px", border: "0px solid white" }}
        src="https://open.spotify.com/embed/playlist/0oDcp5oE5zDuiHX6InU6zB?utm_source=generator"
        width="100%"
        height="352"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </ContentContainer>
  );
};
