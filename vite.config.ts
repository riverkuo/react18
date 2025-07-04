import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/test-react-app',
    plugins: [react()],
    server: {
      proxy: {
        '/mockServiceWorker.js': {
          target: 'http://localhost:5173', // target is the vite dev server
          rewrite: () => '/test-react-app/mockServiceWorker.js', // rewrite the path to the mockServiceWorker.js file
        },
      },
    },

    define: {
      'process.env': env,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // test config
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setupTests.ts',
    },
  };
});
