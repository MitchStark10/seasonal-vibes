import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

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
      Hello world
      <a href={LOGIN_URL}>Login to spotify</a>
    </div>
  );
};

export default AppContainer;
