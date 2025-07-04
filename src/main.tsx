import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from './libs/store/query-client/provider.tsx';
import Home from './pages/Home/index.tsx';
import ReactDOM from 'react-dom/client';
import ListPage from './pages/List/index.tsx';
import Supabase from './pages/Supabase/index.tsx';
import { isLocal } from './utils/mock-data-utils.ts';

async function enableMocking() {
  // if in production, do not enable mocking
  if (!isLocal) return;

  const { worker } = await import('./libs/msw/woker.ts');

  return worker.start();
}

enableMocking().then(() => {
  const root = document.getElementById('root');
  ReactDOM.createRoot(root!).render(
    <StrictMode>
      <QueryClientProvider>
        <App>
          <BrowserRouter basename="/test-react-app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/supabase" element={<Supabase />} />
              <Route path="/mock-data" element={<Supabase />} />
              <Route path="/test" element={<h1>test</h1>} />
            </Routes>
          </BrowserRouter>
        </App>
      </QueryClientProvider>
    </StrictMode>
  );
});
