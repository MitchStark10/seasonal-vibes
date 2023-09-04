import { styled } from "@mui/material";
import SpotifyLogoBlack from "./Spotify_Logo_CMYK_Black.png";
import SpotifyLogoGreen from "./Spotify_Logo_CMYK_Green.png";
import SpotifyLogoWhite from "./Spotify_Logo_CMYK_White.png";
import React from "react";

interface Props {
  variant?: "black" | "green" | "white";
}

const StyledLogo = styled("img")({
  width: "100px",
});

const getSpotifyLogo = (variant: Props["variant"]) => {
  switch (variant) {
    case "black":
      return SpotifyLogoBlack;
    case "green":
      return SpotifyLogoGreen;
    case "white":
      return SpotifyLogoWhite;
    default:
      return SpotifyLogoBlack;
  }
};

export const SpotifyLogo: React.FC<Props> = ({ variant = "black" }) => {
  return <StyledLogo src={getSpotifyLogo(variant)} alt="Spotify Logo" />;
};
