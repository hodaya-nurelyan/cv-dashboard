import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // כדי שיהיה נגיש מחוץ לקונטיינר
    port: 5173,
    watch: {
      usePolling: true, // חובה עבור Docker על Windows/WSL
    },
    proxy: {
    '/api': 'http://localhost:8000',
    },
  },
});
