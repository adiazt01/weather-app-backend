# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port for the backend
EXPOSE 3000

# Start the backend service
CMD ["yarn", "start:dev"]

