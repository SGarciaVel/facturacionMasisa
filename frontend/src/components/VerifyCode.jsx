import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, Avatar, Grid, Paper, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/verify-code', { email, code });
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Error al verificar el código');
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/resend-code', { email });
      setResendSuccess('Código reenviado exitosamente. Revisa tu correo.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al reenviar el código');
    }
  };

  const goToLogin = () => navigate('/login');

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/Masisa_Wallpapers_Mobile_04.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Verificar Código
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>Verificación exitosa. Ya puedes iniciar sesión.</Alert>}
            {resendSuccess && <Alert severity="success" sx={{ mt: 2 }}>{resendSuccess}</Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Código de Verificación"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verificar
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleResendCode}
              >
                Reenviar Código
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mt: 2 }}
                onClick={goToLogin}
              >
                Volver al Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default VerifyCode;
