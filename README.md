# Facturación Masisa - Sistema de Gestión

Este proyecto es un sistema completo de gestión de facturación diseñado específicamente para el área de telecomunicaciones de Masisa S.A.. La aplicación facilita la revisión, análisis y visualización de los datos de facturación de líneas corporativas, permitiendo a los usuarios gestionar la información con rapidez y eficiencia.

El sistema incluye:
- **Backend**: Manejo de registro, inicio de sesión y autenticación de usuarios mediante JWT, así como carga y procesamiento automatizado de archivos XLSX.
- **Frontend**: Interfaz gráfica para que los usuarios interactúen con el sistema, visualicen reportes y gestionen sus datos.

El sistema combina un backend robusto desarrollado en Node.js y un frontend moderno en React, proporcionando una solución integral para la carga, procesamiento y visualización de datos:

-   Carga Automatizada de Archivos: Permite la carga de archivos Excel/XLSX con información de facturación.
-   Procesamiento de Datos: Genera gráficos y reportes estadísticos a partir de los datos cargados.
-   Autenticación Segura: Implementación de inicio de sesión y registro con autenticación JWT.
-   Visualización Intuitiva: Utiliza Material UI y React para ofrecer gráficos interactivos y una experiencia amigable.

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

### Backend
El sistema backend está compuesto por dos partes: una API desarrollada en Node.js para la autenticación y gestión de datos, y una API en Python para el procesamiento de archivos Excel y la generación de gráficos.
Las tecnologías y paquetes utilizados en el servidor son:
- **Node.js 18.19.1 y Express 4.18.2**: Framework para el servidor web.
- **PostgreSQL**: Base de datos relacional para almacenamiento.
- **Sequelize 6.21.1**: ORM para manejar PostgreSQL.
- **bcryptjs 2.4.3**: Encriptación de contraseñas.
- **jsonwebtoken 9.0.2**: Autenticación y autorización mediante JWT.
- **cors 2.8.5**: Permite compartir recursos entre dominios cruzados.
- **dotenv 16.0.3**: Manejo de variables de entorno.
- **multer 1.4.5-lts.1**: Manejo de archivos para la carga de CSV.
- **csv-parser 3.0.0**: Procesamiento eficiente de archivos CSV.
- **nodemailer 6.9.16**: Envío de correos electrónicos.
- **pg 8.13.1 y pg-hstore 2.3.4**: Conector para PostgreSQL.

### Python y Flask:

- **Python 3.10.12**: Lenguaje utilizado para desarrollar la API de procesamiento.
- **Flask 3.0.0**: Microframework para la creación de la API.
- **Flask-CORS 4.0.0**: Permite solicitudes entre dominios (CORS).
- **matplotlib 3.8.0**: Generación de gráficos a partir de datos Excel.
- **openpyxl 3.1.2**: Procesamiento y lectura de archivos Excel (XLSX).

### Frontend

Las tecnologías utilizadas en la interfaz gráfica son:

- **React 18.3.1 y React DOM 18.3.1**: Librería para construir la interfaz de usuario.
- **Material-UI (MUI) 6.1.6**: Framework de componentes modernos de React.
- **Axios 1.7.7**: Cliente HTTP para comunicarse con el backend.
- **Chart.js 4.4.6 y React-ChartJS-2 5.2.0**: Visualización de datos mediante gráficos.
- **Framer Motion 11.11.11**: Animaciones fluidas y optimizadas para React.
- **React-Router-Dom 6.27.0**: Manejo de navegación en la aplicación.
- **React-World-Flags 1.6.0**: Visualización de banderas internacionales.
- **Vite 5.4.10**: Entorno de desarrollo rápido y eficiente.

## Docker


Con una terminal situarse dentro del directorio raiz donde fue clonado este repositorio; `~/git/facturacionMasisa/`.
Una vez situado en la raiz del proyecto, dirigirse al directorio docker y ejecutar lo siguiente para construir la imagen docker:

```bash

docker build -t facturacionMasisa:version1.0 .

```
## Construido con

- [**Node.js**](https://nodejs.org/en) - Backend
- [**Express**](https://expressjs.com/) - Framework para el servidor
- [**PostgreSQL**](https://www.postgresql.org/) - Base de datos
- [**React**](https://react.dev/) - Frontend
- [**Material-UI**](https://mui.com/) - Componentes de interfaz de usuario
- [**Docker**](https://www.docker.com/) - Contenedor para el despliegue

## Configuración

Este proyecto utiliza un esquema de autenticación basado en **JWT** para asegurar las rutas protegidas. Asegúrate de configurar correctamente el archivo `.env`.

### .env
```bash
JWT_SECRET=contraseña_secreta
JWT_EXPIRES_IN=1h
EMAIL_USER=correoejemplo@correo.com
EMAIL_PASS=abcd efgh ijkl mnop

```

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
### Carga de Archivos Excel

- **Subir Archivo XLSX**
  - **POST** `/process-excel`
  - **Descripción**: Carga un archivo Excel y procesa la información para generar gráficos.

## Funcionalidades Actuales

- Registro de usuarios con código de verificación por correo.
- Verificación de cuenta mediante código.
- Inicio de sesión con autenticación JWT.
- Rutas protegidas con verificación de token.
- Carga y procesamiento de archivos CSV.
- Interfaz de usuario consistente entre login y registro.

## Licencia

Todos los derechos reservados. Este proyecto no tiene licencia pública. Para consultas sobre uso o distribución, por favor contacta a [sebastian.garcia1601@alumnos.ubiobio.cl].


## Contribuir al Proyecto

Si deseas contribuir al proyecto, por favor revisa las instrucciones en CONTRIBUTING.md.

## Agradecimientos

Este proyecto fue desarrollado como parte del Sistema de apoyo al Análisis de Facturación de Líneas Celulares Corporativas para Masisa S.A. en el marco de la titulación de Ingeniería en Ejecución en Computación e Informática.



