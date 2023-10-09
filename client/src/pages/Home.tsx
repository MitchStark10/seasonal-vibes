import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { NumberedListItem } from "../components/NumberedListItem";
import { NumberedListItemContainer } from "../components/NumberedListItemContainer";
import { SpotifyButton } from "../components/SpotifyButton";

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

const SpotifyPlaylistContainer = styled("div")({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  width: "100%",
  maxWidth: "1000px",
  margin: "auto",
});

export const SpotifyPlaylistIframe: React.FC<{ playlistId: string }> = ({
  playlistId,
}) => (
  <iframe
    style={{ borderRadius: "12px", border: "0px solid white" }}
    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
    width="100%"
    height="400"
    allowFullScreen={false}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    title="Spotify Playlist"
  ></iframe>
);

export const Home = () => {
  return (
    <ContentContainer>
      <CenteredH1>seasonalvibes</CenteredH1>
      <CenteredDiv>
        <Typography fontSize="28px" fontWeight="bold" margin="10px 0">
          Personalized, Automated Monthly Playlists
        </Typography>
        <Typography fontSize="20px" marginTop="10px" marginBottom="20px">
          Immortalize your current music mood with automatically generated
          playlists based on your most played songs of each month. Follow these
          two quick and simple steps, and we&apos;ll take care of creating your
          playlist on the final day of every month!
        </Typography>
        <NumberedListItemContainer sx={{ marginBottom: "30px" }}>
          <NumberedListItem number={1}>
            Sign in with Spotify using the link below
          </NumberedListItem>
          <NumberedListItem number={2}>
            (Optionally) Personalize your settings
          </NumberedListItem>
        </NumberedListItemContainer>
        <SpotifyButton />
        <Typography
          fontSize="24px"
          fontWeight="bold"
          marginTop="40px"
          marginBottom="10px"
        >
          Browse real playlists generated by seasonalvibes
        </Typography>
        <SpotifyPlaylistContainer>
          <SpotifyPlaylistIframe playlistId="1zgkqPmfluS9Dmjh1IUrtj" />
          <SpotifyPlaylistIframe playlistId="0oDcp5oE5zDuiHX6InU6zB" />
          <SpotifyPlaylistIframe playlistId="3tmUEzrn1COXoVYeqruYpl" />
        </SpotifyPlaylistContainer>
      </CenteredDiv>
    </ContentContainer>
  );
};
