# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your Angular application code
COPY . .

# Open port 4200 (the default Angular development port)
EXPOSE 4200

# Start the Angular development server publicly so you can access it externally
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
