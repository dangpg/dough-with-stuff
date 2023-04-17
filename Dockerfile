# Base image
FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

# Copy source code over
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 1337

# Serve static content
CMD ["pnpm", "serve"]