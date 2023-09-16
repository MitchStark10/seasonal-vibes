import { Button, styled } from "@mui/material";
import { SpotifyLogo } from "./SpotifyLogo";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || "/api/auth/login";

const StyledButtonContainer = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  maxWidth: "250px",
  textDecoration: "none",
});

interface Props {
  variant?: "contained" | "text";
}

export const SpotifyButton: React.FC<Props> = ({ variant = "contained" }) => {
  return (
    <div>
      <StyledButtonContainer
        color={variant === "contained" ? "primary" : "secondary"}
        variant={variant}
        href={LOGIN_URL}
      >
        <b>Log in with</b> <SpotifyLogo />
      </StyledButtonContainer>
    </div>
  );
};
