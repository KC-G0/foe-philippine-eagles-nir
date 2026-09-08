// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://foe-philippine-eagles-nir-backend.onrender.com')
  }
})
