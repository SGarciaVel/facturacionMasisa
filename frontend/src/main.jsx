import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Register from './components/Register';
import VerifyCode from './components/VerifyCode';
import Login from './components/Login';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import FileUpload from './components/FileUpload';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register', element: <Register /> },
  { path: '/verify-code', element: <VerifyCode /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Home /> },
  { path: '/authpage', element: <AuthPage /> },
  { path: '/fileupload', element: <FileUpload /> },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
