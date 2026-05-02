import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
    test: {
    globals: true,
    environment: 'jsdom', // Simule le navigateur
    setupFiles: './src/setupTests.ts',
    css: true,
    },
    server: {
    host: '0.0.0.0',
    port: 5173,
    }
})
