import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { QueryClientProvider } from './libs/store/query-client/provider.tsx';
import Home from './pages/Home/index.tsx';
import ListPage from './pages/List/index.tsx';

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <QueryClientProvider>
      <App>
        <BrowserRouter basename="/test-react-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/test" element={<h1>test</h1>} />
          </Routes>
        </BrowserRouter>
      </App>
    </QueryClientProvider>
  </StrictMode>
);
