import { defineConfig } from 'vite';

export default defineConfig({
  // Sets the base URL for the project. Using './' ensures relative paths work correctly, 
  // which is particularly useful for static hosting like GitHub Pages.
  base: './',

  build: {
    // Defines the output directory for the built files.
    outDir: 'dist',

    // Ensures the output directory is cleared before building to remove outdated files.
    emptyOutDir: true,
  },

  // Includes only HTML files within the 'assets' folder as assets. 
  // This allows additional template files to be processed while ensuring index.html remains functional.
  assetsInclude: ['assets/**/*.html'],
});
