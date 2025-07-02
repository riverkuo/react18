import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { QueryClientProvider } from './libs/store/query-client/provider.tsx';
import Home from './pages/Home/index.tsx';

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <App>
      <QueryClientProvider>
        <BrowserRouter basename="/test-react-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<h1>test</h1>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </App>
  </StrictMode>
);
