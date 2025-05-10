# Use Node.js LTS version
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build TypeScript code
RUN yarn build

# Expose port
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/index.js"] 