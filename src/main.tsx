import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import { isLocal } from './utils/mock-data-utils.ts';

const root = document.getElementById('root');

async function enableMocking() {
  // if in production, do not enable mocking
  if (!isLocal) return;

  const { worker } = await import('./libs/msw/woker.ts');

  return worker.start();
}

enableMocking().then(() => {
  createRoot(root!).render(
    <StrictMode>
      <BrowserRouter basename="/test-react-app">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<h1>test</h1>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
});
