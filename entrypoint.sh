#!/bin/bash

# Iniciar PostgreSQL
service postgresql start

# Iniciar el backend y frontend
cd /app/backend && npm start &
cd /app/frontend && npm run dev &

# Mantener el contenedor en ejecución
tail -f /dev/null