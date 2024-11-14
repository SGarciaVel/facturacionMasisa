import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  IconButton,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#f57c00",
    },
  },
});

const Home = () => {
  const [userName, setUserName] = useState("Usuario");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.get('http://localhost:3000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Correcto encabezado para JWT
                },
            });
            setUserName(`${response.data.nombre} ${response.data.apellido}`);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    fetchUserData();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Ingresos",
        data: [500, 800, 400, 700, 900, 800, 1000, 900, 750, 800, 600, 700],
        backgroundColor: "rgba(0, 123, 255, 0.6)",
      },
      {
        label: "Gastos",
        data: [300, 400, 200, 500, 600, 700, 800, 650, 500, 600, 400, 500],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Bienvenido/a, {userName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              <LogoutIcon />
              Cerrar Sesión
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Estadísticas" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3}>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ pt: 2 }}
                >
                  Gráfico de Ingresos y Gastos
                </Typography>
                <Bar data={chartData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">Información Rápida</Typography>
                  <Typography variant="body2">
                    Total de Ingresos: $12,000
                  </Typography>
                  <Typography variant="body2">
                    Total de Gastos: $8,000
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
