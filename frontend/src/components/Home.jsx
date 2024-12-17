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
  Divider,
  IconButton,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  UploadFile as UploadFileIcon,
  Logout as LogoutIcon,
  FileUpload as FileUploadIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#004d40" },
    secondary: { main: "#f57c00" },
  },
});

const Home = () => {
  const [userName, setUserName] = useState("Usuario");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [graphUrls, setGraphUrls] = useState({ plan: "", service: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(`${response.data.nombre} ${response.data.apellido}`);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/process-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Procesar las URLs de los gráficos recibidas
      const { plan_graph, service_graph } = response.data;
      setGraphUrls({
        plan: `http://localhost:5000/${plan_graph}`,
        service: `http://localhost:5000/${service_graph}`,
      });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Dashboard
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Bienvenido/a, {userName}
              </Typography>
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Cerrar Sesión
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerOpen ? 240 : 0,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerOpen ? 240 : 0,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem button onClick={handleReload}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5" }}>
          <Toolbar />
          <Grid container spacing={3}>
            {/* Subir Archivo */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Subir Archivo
                  </Typography>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    onClick={() => document.getElementById("fileInput").click()}
                    sx={{ mr: 2 }}
                  >
                    Seleccionar Archivo
                  </Button>

                  {/* Vista previa y botón Eliminar */}
                  {selectedFile && (
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                      <InsertDriveFileIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body1" color="textSecondary">
                        {selectedFile.name}
                      </Typography>
                      <IconButton color="error" onClick={handleDeleteFile} sx={{ ml: 2 }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUpload}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <FileUploadIcon />}
                    sx={{ mt: 2 }}
                  >
                    Subir Archivo
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de Planes Tarifarios */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Gráfico de Planes Tarifarios
                  </Typography>
                  {graphUrls.plan ? (
                    <img src={graphUrls.plan} alt="Gráfico de Planes Tarifarios" style={{ maxWidth: "100%" }} />
                  ) : (
                    <Typography variant="body2">
                      No hay gráfico generado. Sube un archivo para comenzar.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de Clientes */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Gráfico de Clientes (Top 5 N° de Servicio)
                  </Typography>
                  {graphUrls.service ? (
                    <img src={graphUrls.service} alt="Gráfico de Clientes" style={{ maxWidth: "100%" }} />
                  ) : (
                    <Typography variant="body2">
                      No hay gráfico generado. Sube un archivo para comenzar.
                    </Typography>
                  )}
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
