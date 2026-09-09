# --- STAGE 1: Build the Angular Application ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Fix: Use --no-audit and --no-fund to lower RAM usage during install
RUN npm ci --no-audit --no-fund

# Copy the rest of the application code
COPY . .

# Build the application for production
#RUN npm run build -- --configuration=production

# Fix: Restrict Node max memory allocation to 512MB or 1GB during compilation
ENV NODE_OPTIONS="--max-old-space-size=512"
RUN npm run build -- --configuration=production

# --- STAGE 2: Serve the application using NGINX ---
FROM nginx:alpine

# Copy the build output from Stage 1 to NGINX HTML directory
# Note: Replace "my-angular-app" with the actual project name found in your angular.json file
COPY --from=build /app/dist/bus-seat-booking/browser /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]#
