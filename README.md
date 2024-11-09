# Facturación Masisa - Backend

Este proyecto corresponde al backend de una aplicación de facturación diseñada para la gestión del área de telecomunicaciones en Masisa. Proporciona endpoints para el registro, inicio de sesión y autenticación de usuarios mediante JWT.

## Tabla de Contenidos
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Rutas de la API](#rutas-de-la-api)
- [Funcionalidades Actuales](#funcionalidades-actuales)
- [Próximos Pasos](#próximos-pasos)

## Tecnologías Utilizadas
- **Node.js** y **Express**: Framework para el backend y manejo de rutas.
- **PostgreSQL**: Base de datos relacional para almacenamiento de usuarios.
- **JWT**: Autenticación de usuarios.
- **bcrypt.js**: Encriptación de contraseñas.

## Instalación

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/SGarciaVel/facturacionMasisa.git
    cd facturacionMasisa/backend
    ```

2. **Instalar dependencias**:
    ```bash
    npm install
    ```

3. **Configurar la base de datos**:
   - Asegúrate de tener PostgreSQL configurado y en funcionamiento.
   - Crea una base de datos llamada `facturacion_masisa` o según tu preferencia.
   - Usa el siguiente esquema SQL para crear la tabla `users`:
     ```sql
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(50) UNIQUE NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );
     ```

