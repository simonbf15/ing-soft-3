# Imagen base
FROM node:18

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de la app
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["node", "index.js"]
