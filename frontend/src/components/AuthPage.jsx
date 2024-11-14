import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Paper,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from 'react-select';
import Flag from 'react-world-flags';
import dayjs from 'dayjs';
import axios from 'axios';

const theme = createTheme();

const countryOptions = [
  { value: 'CL', label: 'Chile', flag: 'CL' },
  { value: 'EC', label: 'Ecuador', flag: 'EC' },
  { value: 'CO', label: 'Colombia', flag: 'CO' },
  { value: 'PE', label: 'Perú', flag: 'PE' },
  { value: 'MX', label: 'México', flag: 'MX' },
  { value: 'VE', label: 'Venezuela', flag: 'VE' },
  { value: 'US', label: 'Estados Unidos', flag: 'US' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '4px',
    borderColor: '#c4c4c4',
    padding: '0 10px',
    boxShadow: 'none',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': { borderColor: '#1976d2' },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '40%',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const AuthPage = () => {
  const [view, setView] = useState('login'); // 'login', 'register', 'verify'
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    pais: '',
    fechaNacimiento: '',
    code: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, pais: selectedOption.label });
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (view === 'login') {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        setSuccess('Inicio de sesión exitoso');
      } else if (view === 'register') {
        const currentDate = dayjs();
        const selectedDate = dayjs(formData.fechaNacimiento);
        const age = currentDate.diff(selectedDate, 'year');

        if (age < 18) {
          setError('Debes tener al menos 18 años para registrarte.');
          return;
        }

        await axios.post('http://localhost:3000/api/users/register', formData);
        setView('verify');
        setSuccess('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
      } else if (view === 'verify') {
        await axios.post('http://localhost:3000/api/users/verify-code', {
            code: formData.code,
        });
        setView('login');
        setSuccess('Verificación exitosa. Ya puedes iniciar sesión.');
    }
    
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error');
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/resend-code', {
        email: formData.email,
      });
      setResendSuccess('Código reenviado exitosamente. Revisa tu correo.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al reenviar el código');
    }
  };

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
              {view === 'login' ? 'Iniciar Sesión' : view === 'register' ? 'Registrarse' : 'Verificar Código'}
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {resendSuccess && <Alert severity="success" sx={{ mt: 2 }}>{resendSuccess}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {view === 'login' && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordarme"
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Iniciar Sesión
                  </Button>
                  <Button onClick={() => setView('register')} fullWidth sx={{ mt: 1 }}>
                    ¿No tienes cuenta? Regístrate
                  </Button>
                </>
              )}

              {view === 'register' && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Select
                    options={countryOptions}
                    getOptionLabel={(e) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Flag code={e.flag} style={{ width: 20, marginRight: 10 }} />
                        {e.label}
                      </div>
                    )}
                    styles={customStyles}
                    placeholder="Selecciona un país"
                    onChange={handleCountryChange}
                    isSearchable={false}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fechaNacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    InputLabelProps={{ shrink: true }}
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Registrarse
                  </Button>
                  <Button onClick={() => setView('login')} fullWidth sx={{ mt: 1 }}>
                    ¿Ya tienes cuenta? Inicia sesión
                  </Button>
                </>
              )}

              {view === 'verify' && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="code"
                    label="Código de Verificación"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Verificar
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleResendCode}>
                    Reenviar Código
                  </Button>
                  <Button onClick={() => setView('login')} fullWidth sx={{ mt: 1 }}>
                    Volver al Login
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AuthPage;
