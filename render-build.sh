#!/usr/bin/env bash
# Exit on error
set -e

# Print each command for debugging
set -x

# Install dependencies with pnpm
echo "Installing dependencies..."
npm install -g pnpm
pnpm install

# Generate Prisma client
echo "Generating Prisma client..."
pnpm prisma:generate

# Build all applications
echo "Building applications..."
pnpm nx run client:build:production
pnpm nx run artboard:build:production
pnpm nx run server:build:production

# Apply database migrations if needed
# Uncomment this for the first deployment or when you have schema changes
# echo "Running database migrations..."
# pnpm prisma:migrate

echo "Build completed successfully!" 