import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/WebXR_TTRPG/' : '/',
  root: 'public',
  publicDir: '../public',
  server: {
    host: true, // Allow access from network (important for testing on mobile)
    port: 3000,
    https: false, // Using HTTP with Chrome flag for local testing
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
