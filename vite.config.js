import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bright-toy-exchange/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})
