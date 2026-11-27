import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// The site has more than one page. Each HTML file listed here is built into dist/.
// On hamapps.dev, CloudFront (SST StaticSite) serves /join from join.html,
// so links can use the clean address /join.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        join: resolve(import.meta.dirname, 'join.html'),
      },
    },
  },
})
