import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For Vercel deployment, base should be '/' (root)
  base: '/',
  build: {
    outDir: 'dist',
  }
});