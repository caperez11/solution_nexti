# Usar una imagen base de Node.js para la construcción
FROM node:18-alpine as builder

# Establecer el directorio de trabajo dentro de la imagen
WORKDIR /app

# Copiar package.json y package-lock.json para aprovechar la cache de docker
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación a la imagen
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen base de NGINX para servir la aplicación
FROM nginx:alpine

# Copiar el resultado de la construcción al directorio correcto de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Eliminar el archivo de configuración por defecto de NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copiar un archivo de configuración personalizado de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que usará NGINX
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]