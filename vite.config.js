import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/bright-toy-exchange/',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Важно для обработки всех ресурсов
  }
})
