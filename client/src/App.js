import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)


const AppContent = () => {
  return (
    <div>
      Hello world
    </div>
  );
}

export default AppContainer;
