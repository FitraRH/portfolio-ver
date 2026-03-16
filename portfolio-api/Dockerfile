# Production Dockerfile for Node.js Express Backend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose port (Railway will provide via PORT env)
EXPOSE 8080

# Start command
CMD ["npm", "start"]
