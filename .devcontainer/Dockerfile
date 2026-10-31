FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm

ARG NODE_VERSION="22"
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION} && nvm use default"

# Install pinned npm 10 & global Angular CLI matching workspace major version
RUN npm install -g npm@^10 @angular/cli@^22

# Install system dependencies required by headless browsers
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libgbm1 \
    libdrm2 \
    libx11-xcb1 \
    libxrandr2 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxfixes3 \
    libxshmfence1 \
    libpango-1.0-0 \
    libcairo2 \
    libcairo-gobject2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libasound2 \
    libcups2 \
    libdbus-1-3 \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 4200
