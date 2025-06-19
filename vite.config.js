/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE_URL,
    experimental: {
      renderBuiltUrl: (filename) => `${env.VITE_BASE_URL}/${filename}`
    },
    plugins: [react(), jsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './tests/setup.js',
      coverage: {
        reporter: ['html', 'text']
      }
    }
  };
});
