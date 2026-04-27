import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' makes the built site work when opened directly from the file system
  // (double-clicking dist/index.html). Useful for offline demo fallback.
  base: './',
})
