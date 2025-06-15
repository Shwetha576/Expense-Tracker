# Use Node.js base image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app listens on
EXPOSE 8000

# Start the app
CMD ["node", "dist/server.js"]
