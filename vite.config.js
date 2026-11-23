import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' lets the built site work from any folder, including GitHub Pages
// (https://<org>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
