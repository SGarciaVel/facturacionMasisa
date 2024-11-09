# Facturación Masisa - Sistema de Gestión

Este proyecto es un sistema completo de gestión de facturación diseñado para el área de telecomunicaciones de Masisa. Combina un backend robusto desarrollado en Node.js con un frontend moderno en React, proporcionando una solución integral para la revisión, análisis y visualización de datos de facturación.

El sistema incluye:
- **Backend**: Manejo de registro, inicio de sesión y autenticación de usuarios mediante JWT, así como carga y procesamiento automatizado de archivos CSV.
- **Frontend**: Interfaz gráfica para que los usuarios interactúen con el sistema, visualicen reportes y gestionen sus datos.

## Tabla de Contenidos
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Rutas de la API](#rutas-de-la-api)
  - [Usuarios](#usuarios)
  - [Carga de Archivos CSV](#carga-de-archivos-csv)
- [Funcionalidades Actuales](#funcionalidades-actuales)
- [Próximos Pasos](#próximos-pasos)
- [Licencia](#licencia)


## Tecnologías Utilizadas
- **Node.js** y **Express**: Framework para el backend y manejo de rutas.
- **PostgreSQL**: Base de datos relacional para almacenamiento de usuarios.
- **JWT**: Autenticación de usuarios.
- **bcrypt.js**: Encriptación de contraseñas.
- **Nodemailer**: Envío de correos electrónicos.

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
4. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:
     ```env
     EMAIL_USER=tu_correo@gmail.com
     EMAIL_PASS=tu_contraseña_de_aplicación
     JWT_SECRET=clave_secreta
     JWT_EXPIRES_IN=1h
     DB_USER=tu_usuario_db
     DB_PASSWORD=tu_contraseña_db
     DB_HOST=tu_host_db
     DB_PORT=5432
     DB_DATABASE=facturacion_masisa
     ```

5. **Iniciar el servidor**:
   - Para desarrollo:
     ```bash
     npm run dev
     ```
   - Para producción:
     ```bash
     npm start
     ```

## Configuración

Este proyecto utiliza un esquema de autenticación basado en **JWT** para asegurar las rutas protegidas. Asegúrate de configurar correctamente el archivo `.env`.

## Rutas de la API

### Usuarios

- **Registro de Usuario con Verificación**
  - **POST** `/api/users/register`
  - **Descripción**: Registra un nuevo usuario y envía un código de verificación al correo.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan.perez@correo.com",
      "password": "passwordSeguro123",
      "pais": "Chile",
      "fechaNacimiento": "1990-01-01"
    }
    ```

- **Verificación de Código**
  - **POST** `/api/users/verify-code`
  - **Descripción**: Verifica el código enviado al correo para activar la cuenta.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "email": "juan.perez@correo.com",
      "code": "ABC123"
    }
    ```

- **Inicio de Sesión**
  - **POST** `/api/users/login`
  - **Descripción**: Inicia sesión y devuelve un token JWT.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "email": "juan.perez@correo.com",
      "password": "passwordSeguro123"
    }
    ```
### Carga de Archivos CSV

- **Subir Archivo CSV**
  - **POST** `/api/csv/upload`
  - **Descripción**: Permite subir y procesar un archivo CSV.
  - **Encabezado**: `Content-Type: multipart/form-data`
  - **Respuesta Exitosa**:
    ```json
    {
      "message": "Archivo CSV procesado exitosamente",
      "data": [...]
    }
    ```

## Funcionalidades Actuales

- Registro de usuarios con código de verificación por correo.
- Verificación de cuenta mediante código.
- Inicio de sesión con autenticación JWT.
- Rutas protegidas con verificación de token.

## Próximos Pasos

- **Frontend**:
  - Desarrollar e integrar la interfaz gráfica de usuario (GUI) utilizando React + Vite.
  
- **Visualización de Datos**:
  - Implementar gráficos e informes detallados para el análisis de facturación.

- **Notificaciones**:
  - Alertas automáticas para inconsistencias en los datos de facturación.

- **Pruebas**:
  - Implementar pruebas unitarias e integrales para asegurar la calidad del software.


## Licencia

Todos los derechos reservados. Este proyecto no tiene licencia pública. Para consultas sobre uso o distribución, por favor contacta a [sebastian.garcia1601@alumnos.ubiobio.cl].



