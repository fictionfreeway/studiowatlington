import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // This ensures assets load correctly under studiowatlington.com
  build: {
    outDir: 'dist', // Ensures the built files go into 'dist'
    emptyOutDir: true, // Cleans old files before building
  },
  server: {
    port: 4200, // Optional: Ensures the dev server runs on a familiar port
  },
});
