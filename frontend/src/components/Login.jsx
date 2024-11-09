import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Enviando datos de login:', { email, password });

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.token) {
        // Almacenar el token en el localStorage
        localStorage.setItem('token', response.data.token);

        // Verifica si el token fue guardado correctamente
        console.log(localStorage.getItem('token'));

        // Redirigir al usuario a la página de inicio
        alert('Login exitoso!');
        navigate('/home');
      } else {
        console.log(response.data.token)
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al hacer la solicitud');
      console.error('Error en la solicitud de login:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
