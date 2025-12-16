import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Setting base to './' ensures assets are loaded relatively, 
    // which prevents white screens on GitHub Pages subdirectories.
    base: './', 
    define: {
      // Polyfill process.env for the Google GenAI SDK and existing code
      'process.env': env
    },
    build: {
      outDir: 'dist',
    }
  };
});