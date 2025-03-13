import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isLocal } from './utils/mock-data-utils.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// async function enableMocking() {
//   // if in production, do not enable mocking
//   if (!isLocal) {
//     return;
//   }

//   const { worker } = await import('./libs/msw/woker.ts');

//   return worker.start();
// }

// enableMocking().then(() => {
//   createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// });
