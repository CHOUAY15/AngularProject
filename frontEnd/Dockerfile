# Étape 1 : Construire l'application Angular
FROM node:20 as build

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application Angular
COPY . .

# Construire l'application Angular pour production
RUN npm run build --prod

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

# Copier les fichiers Angular buildés dans le répertoire de Nginx
COPY --from=build /app/dist/flexy-admin-angular-lite /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
