# Usar una imagen base de Node.js
FROM node:22

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar el proyecto (si es necesario)
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 3003

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]