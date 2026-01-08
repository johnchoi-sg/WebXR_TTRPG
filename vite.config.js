import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/WebXR_TTRPG/' : '/',
  server: {
    host: true, // Allow access from network (important for testing on mobile)
    port: 3000,
    https: false, // Using HTTP with Chrome flag for local testing
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
