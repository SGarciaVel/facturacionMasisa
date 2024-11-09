import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',  // Proxy las solicitudes a la API en el puerto 3000
    },
  },
});
