import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ui/',
  resolve: { alias: { '@': path.resolve(__dirname, 'src'), '@registry': path.resolve(__dirname, 'registry/republic') } },
  server: { port: 8995 },
})
