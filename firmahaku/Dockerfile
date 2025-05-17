# Use the official Node.js image
FROM ubuntu:24.04

# Install curl and Node.js (LTS)
RUN apt-get update && apt-get install -y curl gnupg \
    mc \
    nano \
    openssh-client \
    openssh-server \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    libpq-dev \
    libffi-dev \
    libssl-dev \
    libxml2-dev && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs 
    #&& rm -rf /var/lib/apt/lists/*


# Set working directory
RUN mkdir -p /home/apps/firma/firmahaku/
WORKDIR /home/apps/firma/firmahaku

# Install dependencies
#COPY package*.json ./
RUN npm install 
#-g next

# Copy the app
#COPY . .

# Build the Next.js app
# RUN npm run build

# Expose port and start the app
EXPOSE 3000
#CMD ["npm", "start"]
CMD ["npm", "run", "dev"]