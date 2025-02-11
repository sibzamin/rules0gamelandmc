import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/rules.json': {
        target: 'http://localhost:3000',
        changeOrigin: false,
      },
    },
  },
  build: {
    emptyOutDir: true,
  },
});
