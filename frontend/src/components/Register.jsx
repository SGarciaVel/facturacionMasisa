import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Select from 'react-select';
import Flag from 'react-world-flags';
import dayjs from 'dayjs';
import axios from 'axios';

const theme = createTheme();

const countryOptions = [
  { value: 'CL', label: 'Chile', flag: 'CL' },
  { value: 'EC', label: 'Ecuador', flag: 'EC'},
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
  input: (provided) => ({
    ...provided,
    margin: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: state.isSelected ? '#1976d2' : state.isFocused ? '#e3f2fd' : 'white',
    color: state.isSelected ? 'white' : 'black',
    padding: 10,
  }),
};

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    pais: '',
    fechaNacimiento: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [dateError, setDateError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, pais: selectedOption.label });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = dayjs();
    const selectedDate = dayjs(formData.fechaNacimiento);
    const age = currentDate.diff(selectedDate, 'year');

    if (age < 18) {
      setDateError('Debes tener al menos 18 años para registrarte.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users/register', formData);
      setSuccess(true);
      setError('');
      setDateError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar el usuario');
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
            backgroundImage: 'url(/masisalogin.jpeg)',
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
              Registrarse
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>Registro exitoso. Revisa tu correo para verificar tu cuenta.</Alert>}
            {dateError && <Alert severity="error" sx={{ mt: 2 }}>{dateError}</Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                isSearchable={false} // Desactiva la búsqueda
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
