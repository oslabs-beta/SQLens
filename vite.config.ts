import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('src/server')],
  build: {
    outDir: 'dist', // Output directory for production build
    minify: 'terser', // Minify JavaScript
    cssCodeSplit: true, // Enable CSS code splitting
  },
})
