import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Register from './components/Register'; // Ruta para el registro
import VerifyCode from './components/VerifyCode'; // Ruta para la verificación de código
import Login from './components/Login';
import Home from './components/Home';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register', element: <Register /> }, // Ruta de registro
  { path: '/verify-code', element: <VerifyCode /> }, // Ruta de verificación
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
