FROM ubuntu:22.04

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias básicas
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    python3-pip \
    build-essential \
    && apt-get clean

# Instalar Node.js 18.19.1 y npm
RUN curl -fsSL https://nodejs.org/dist/v18.19.1/node-v18.19.1-linux-x64.tar.xz | tar -xJ -C /usr/local --strip-components=1

# Verificar la instalación
RUN node -v && npm -v && python3 --version

RUN git clone https://github.com/SGarciaVel/facturacionMasisa .

RUN cd /app/backend && npm install && cd /app/frontend && npm install vite && npm install

RUN cd /app/backend/api && pip3 install flask flask-cors pandas openpyxl

# Exponer el puerto 80
EXPOSE 80

# Comando de entrada para iniciar el contenedor (usando un script de inicio para manejar ambos servidores)
CMD ["bash", "-c", "cd /app/backend && npm start & cd /app/frontend && npm run dev && wait"]