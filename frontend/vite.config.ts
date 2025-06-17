import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
    },
  },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false,
      timeout: 5000,
    },
    fs: {
      strict: false,
    }
  },
  optimizeDeps: {
    force: true,
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  }
})
