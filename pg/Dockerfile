# Use the official PostgreSQL image as the base
# postresql:latest (it is with Debian OS so apt works)
FROM postgres:17.5

# Set environment variable to non-interactive to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install required tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
#    openssh-server \
    htop \
    mc \
    nano \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set up SSH server (optional basic config)
RUN mkdir /var/run/sshd

# Expose SSH port (22) in addition to PostgreSQL port (5432)
EXPOSE 5432 
#22

# Set default command to run PostgreSQL as usual
CMD ["docker-entrypoint.sh", "postgres"]