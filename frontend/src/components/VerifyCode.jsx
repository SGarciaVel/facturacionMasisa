import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const VerifyCode = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/verify-code', {
        email,
        code,
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al verificar el código');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: 1,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Verificar Código
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Verificación exitosa. Ya puedes iniciar sesión.</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Código de Verificación"
          name="code"
          fullWidth
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Verificar
        </Button>
      </form>
    </Box>
  );
};

export default VerifyCode;
