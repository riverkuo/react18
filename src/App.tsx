import './App.css';
import { Home } from './layout/home';
import { QueryClientProvider } from './libs/store/query-client/provider';

function App() {
  return (
    <QueryClientProvider>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
