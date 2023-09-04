import { Button, styled } from "@mui/material";
import { SpotifyLogo } from "../SpotifyButton/SpotifyLogo";

const StyledHeaderContainer = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
  borderBottom: "1px solid black",
  backgroundColor: theme.palette.primary.main,
  padding: "10px",
}));

const StyledHeaderText = styled("h1")({
  margin: "-5px 0 0 0",
});

export const Header = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeaderText>seasonalvibes</StyledHeaderText>
      <Button
        variant="outlined"
        href="https://github.com/MitchStark10/quarterly-vibes"
        target="_blank"
      >
        About
      </Button>
    </StyledHeaderContainer>
  );
};
