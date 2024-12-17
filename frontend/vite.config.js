import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80, // Apache
    host: '0.0.0.0',
    proxy: {
      '/api': {
      target: 'http://localhost:3000',  // Proxy las solicitudes a la API en el puerto 3000
      changeOrigin: true
      }
    },
  },
});
