import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // ✅ Fix for GitHub Pages - ensures relative paths work
  build: {
    outDir: 'dist', // ✅ Ensure output is in 'dist'
    emptyOutDir: true, // ✅ Clear old files before building
  },
});
