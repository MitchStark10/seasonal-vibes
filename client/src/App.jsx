import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Header } from "./components/Header";
import { SpotifyButton } from "./components/SpotifyButton";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || "/auth/login";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

const AppContent = () => {
  return (
    <div>
      <Header />
      <SpotifyButton />
    </div>
  );
};

export default AppContainer;
