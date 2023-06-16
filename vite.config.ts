/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    cacheDir: './node_modules/.vite/pokemons-test',
    define: {
      'process.env': {
        REACT_APP_NODE_ENV: env.REACT_APP_NODE_ENV,
        REACT_APP_API_URL: env.REACT_APP_API_URL,
        REACT_APP_IMAGE_STORAGE_URL: env.REACT_APP_IMAGE_STORAGE_URL,
      },
    },

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [
      react(),
      viteTsConfigPaths({
        root: './',
      }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: './',
    //    }),
    //  ],
    // },

    test: {
      globals: true,
      cache: {
        dir: './node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
