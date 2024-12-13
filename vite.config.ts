import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteEnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
    rollupOptions: {
      external: ['msw'],
    },
  },
  plugins: [react(),     ViteEnvironmentPlugin({
    // Here you can define your env variables you want to inject into your app
    VITE_QUIZ_API: process.env.VITE_QUIZ_API,
    MODE: process.env.MODE || 'development', // You can provide default values if desired
  }),],
})
