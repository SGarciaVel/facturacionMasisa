// src/components/FileUpload.jsx
import { useState } from 'react';
import api from '../services/api';  // Importa el archivo api.js
import { Button, Box, Input, Text } from '@chakra-ui/react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Guardar el archivo seleccionado
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Realizar la solicitud de carga de archivo al backend
      const response = await api.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al cargar el archivo');
    }
  };

  return (
    <Box p={4}>
      <h2>Cargar archivo CSV</h2>
      <form onSubmit={handleUpload}>
        <Input type="file" onChange={handleFileChange} />
        <Button type="submit">Subir archivo</Button>
      </form>
      {message && <Text>{message}</Text>}
    </Box>
  );
};

export default FileUpload;
