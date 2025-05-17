FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    postgresql \
    openssh-server \
    sudo \
    mc \
    nano \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set up PostgreSQL
RUN mkdir -p /var/run/postgresql && chown -R postgres:postgres /var/run/postgresql

# Set up SSH
RUN mkdir /var/run/sshd

# Create postgres user SSH access
RUN echo "postgres:password" | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

USER postgres

# Start both SSH and PostgreSQL using supervisord or a shell script
USER root
CMD service postgresql start && /usr/sbin/sshd -D