/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('./server')],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4173',
  //       changeOrigin: true,
  //     }
  //   },
  // },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: ['./__tests__/setupTests.ts'],
  // },
  build: {
    outDir: 'dist', // Output directory for production build
    minify: 'terser', // Minify JavaScript
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendors'; // This will put all node_modules code into a separate chunk
          }
        }
      }
    },
  },
})
