import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the whole site into ONE file, demo/index.html, that opens straight
// from your computer (double-click it) with no server or install needed.
// Run `npm run build:demo` after changing the code to refresh it.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  publicDir: false,
  build: {
    outDir: 'demo',
    emptyOutDir: true,
  },
})
