# --- STAGE 1: Build the Angular Application ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Change this line in your Dockerfile:
RUN npm ci --progress=true --loglevel=info

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build -- --configuration=production

# --- STAGE 2: Serve the application using NGINX ---
FROM nginx:alpine

# Copy the build output from Stage 1 to NGINX HTML directory
# Note: Replace "my-angular-app" with the actual project name found in your angular.json file
COPY --from=build /app/dist/bus-seat-booking/browser /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
