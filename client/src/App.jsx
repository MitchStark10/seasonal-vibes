import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Header } from "./components/Header";
import { theme } from "./components/Theme";
import { AccessDenied } from "./pages/AccessDenied";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

const AppContent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppContainer;
