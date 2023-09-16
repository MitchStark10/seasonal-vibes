import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1DB954",
    },
    secondary: {
      main: "#000000",
    },
    grey: {
      500: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    button: {
      fontWeight: "bold",
    },
  },
});
