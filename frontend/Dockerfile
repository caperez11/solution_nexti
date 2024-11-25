# Usa una imagen base ligera que tenga Bun preinstalado
FROM node:18-alpine as bun-setup

# Instalar Bun
RUN apk add --no-cache curl bash \
    && curl -fsSL https://bun.sh/install | bash \
    && ln -s /root/.bun/bin/bun /usr/local/bin/bun

# Crear una etapa de construcción para la aplicación
FROM bun-setup as build
WORKDIR /app

# Copiar los archivos del proyecto
COPY bun.lockb package.json ./
COPY . .

# Instalar dependencias usando Bun
RUN bun install

# Construir la aplicación (asume que usas Vite u otro script definido)
RUN bun run build

# Usar Nginx para servir los archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
