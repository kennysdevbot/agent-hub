import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/agent-hub/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
