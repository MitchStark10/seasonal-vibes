import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Header } from "./components/Header";
import { SpotifyButton } from "./components/SpotifyButton";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/Theme";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

const AppContent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SpotifyButton />
    </ThemeProvider>
  );
};

export default AppContainer;
