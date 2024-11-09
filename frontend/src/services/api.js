import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',  // Asegúrate de que esta URL sea correcta
    timeout: 5000,                    // Tiempo de espera de la solicitud
  });

// Agregar el interceptor para agregar el token si está disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recuperar token de localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar el token a las cabeceras
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
