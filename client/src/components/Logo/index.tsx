import { styled } from "@mui/material";
import blackLogo from "./black_logo.svg";
import whiteLogo from "./white_logo.svg";

const StyledLogo = styled("img")(({ size }: { size: Size }) => ({
  height: size === "small" ? "40px" : "80px",
}));

type Size = "small" | "large";

interface Props {
  variant?: "white" | "black";
  size?: Size;
}

export const Logo: React.FC<Props> = ({
  variant = "white",
  size = "small",
}) => (
  <StyledLogo
    size={size}
    src={variant === "white" ? whiteLogo : blackLogo}
    alt="Seasonal Vibes Logo"
  />
);
