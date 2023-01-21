import logo from './logo.svg';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useMessage } from './hooks/use-message';

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)


const AppContent = () => {
  const { data: message } = useMessage();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default AppContainer;
