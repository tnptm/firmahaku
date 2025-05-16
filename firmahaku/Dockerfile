# Use the official Node.js image
FROM ubuntu:24.04

# Install curl and Node.js (LTS)
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs 
    #&& rm -rf /var/lib/apt/lists/*


# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]