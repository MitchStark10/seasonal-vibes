import { HelpCenter, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  css,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import { SPOTIFY_REFRESH_TOKEN_HEADER_KEY } from "../../lib/constants";
import { getCookieValue } from "../../lib/getCookieValue";
import { Logo } from "../Logo";
import { SpotifyButton } from "../SpotifyButton";
import { StyledLink } from "../StyledLink";

const aboutLinkHref = "https://github.com/MitchStark10/quarterly-vibes";

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

const ActionContainer = styled("span")(
  () => css`
    display: flex;
    gap: 10px;

    @media only screen and (max-width: 600px) {
      display: none;
    }
  `
);

const StyledMenuIconContainer = styled(IconButton)(
  () => css`
    color: #1db954;
    @media only screen and (min-width: 600px) {
      display: none;
    }
  `
);

export const Header = () => {
  const [showMobileMenuContents, setShowMobileMenuContents] = useState(false);
  const mobileMenuRef = useRef<HTMLSpanElement>(null);
  const refreshToken = getCookieValue(SPOTIFY_REFRESH_TOKEN_HEADER_KEY);

  return (
    <StyledHeaderContainer>
      <ContentContainer>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
        <span>
          <ActionContainer>
            {refreshToken ? (
              <Button variant="contained" href="/settings">
                Settings
              </Button>
            ) : (
              <SpotifyButton />
            )}
            <Button variant="outlined" href={aboutLinkHref} target="_blank">
              About
            </Button>
          </ActionContainer>
          <span ref={mobileMenuRef}>
            <StyledMenuIconContainer
              onClick={() => setShowMobileMenuContents(true)}
            >
              <MenuIcon />
            </StyledMenuIconContainer>
          </span>
          <Menu open={showMobileMenuContents} anchorEl={mobileMenuRef.current}>
            {refreshToken ? (
              <StyledLink to="/settings">
                <MenuItem>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
              </StyledLink>
            ) : (
              <MenuItem>
                <SpotifyButton variant="text" />
              </MenuItem>
            )}
            <StyledLink to={aboutLinkHref}>
              <MenuItem href={aboutLinkHref}>
                <ListItemIcon>
                  <HelpCenter />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </MenuItem>
            </StyledLink>
          </Menu>
        </span>
      </ContentContainer>
    </StyledHeaderContainer>
  );
};
