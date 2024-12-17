
## Equipo de Desarrollo

## Autores

- [Sebastian Garcia Velasquez](https://github.com/SGarciaVel/) - **Creador** - sebastian.garcia1601@alumnos.ubiobio.cl


## Estándar de Codificación

### Estilo de Codificación

El estilo de código en este proyecto sigue las recomendaciones de **ESLint** configuradas para **React** y **Node.js**. Las reglas y configuraciones de ESLint aseguran un código limpio, consistente y fácil de mantener.

### Herramientas Utilizadas

1. **ESLint**: Asegura que el código cumpla con los estándares definidos.

-   Configuración: Uso de reglas base para React y recomendaciones de estilo de código moderno.
-   Comando de ejecución:
```bash
    npm run lint
```
-   Instalación de dependencias (si no están):
```bash
    npm install eslint eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

## Configuraciones para Editores de Código

Antes de escribir o modificar el código, asegúrate de que tu editor cumpla con las siguientes configuraciones:

-   **Final/Salto de Línea** (EOL - End of Line):`LF`
-   **Codificación de Archivos de Código** (Encoding - Charset):`UTF-8`
-   **Tabulación**: `Espacios`
-   **Longitud Máxima de Línea**: 80 caracteres (recomendado para legibilidad).

## Archivos/Directorios que no deben estar en ambientes de producción
-   `docker/*`
-   `composer.lock`
-   `README.md`
-   `.gitignore`
-   `.git/*`