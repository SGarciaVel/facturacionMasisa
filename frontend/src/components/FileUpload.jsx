import { useState } from "react";
import api from "../services/api";
import { Button, Box, Input, Text } from "@chakra-ui/react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/process-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Recibir la imagen como archivo blob
      });

      const imageUrl = URL.createObjectURL(response.data); // Convertir el blob en una URL
      setImageUrl(imageUrl); // Mostrar la imagen en el componente
      setErrorMessage(""); // Limpiar cualquier error previo
    } catch (error) {
      setImageUrl("");
      setErrorMessage(
        error.response?.data?.error || "Hubo un error al procesar el archivo."
      );
    }
  };

  return (
    <Box p={4}>
      <h2>Cargar archivo</h2>
      <form onSubmit={handleUpload}>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".xls,.xlsx"
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" colorScheme="teal">
          Subir archivo
        </Button>
      </form>
      {errorMessage && <Text color="red.500" mt={4}>{errorMessage}</Text>}
      {imageUrl && <img src={imageUrl} alt="Gráfico generado" style={{ marginTop: "20px", maxWidth: "100%" }} />}
    </Box>
  );
};

export default FileUpload;
