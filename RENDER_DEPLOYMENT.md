# Deploying EZ Resume on Render

This guide explains how to deploy the entire EZ Resume application (client, server, and artboard) on Render.

## Overview

Render allows you to deploy your full application stack with these components:

1. **Web Service** - For the server (NestJS backend API)
2. **Static Site** - For the client and artboard frontends
3. **PostgreSQL** or **External MongoDB** - For the database

## Prerequisites

- [Render account](https://render.com/signup)
- [GitHub account](https://github.com/signup) with your repository
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) for the database (recommended)

## Step 1: Prepare Your Database

### Option 1: MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas cluster (free tier is sufficient to start)
2. Set up a database user with read/write permissions
3. Configure network access to allow connections from anywhere (or Render's IP ranges)
4. Get your MongoDB connection string

### Option 2: PostgreSQL on Render

1. In Render dashboard, go to "PostgreSQL"
2. Click "New PostgreSQL"
3. Configure your database (name, region, etc.)
4. Create the database and note the connection details

## Step 2: Prepare Your Code

1. Add a `render.yaml` file to the root of your project with the following content:

```yaml
services:
  # Backend API Service
  - type: web
    name: ez-resume-api
    env: node
    buildCommand: pnpm install && pnpm prisma:generate && pnpm run build
    startCommand: pnpm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_PROVIDER
        value: mongodb
      - key: DATABASE_URL
        sync: false
      - key: PORT
        value: 3000
      - key: PUBLIC_URL
        fromService:
          type: web
          name: ez-resume-web
          property: url
      - key: ACCESS_TOKEN_SECRET
        generateValue: true
      - key: REFRESH_TOKEN_SECRET
        generateValue: true

  # Frontend Static Site
  - type: web
    name: ez-resume-web
    env: static
    buildCommand: pnpm install && pnpm nx run client:build:production && pnpm nx run artboard:build:production
    staticPublishPath: ./dist/apps/client
    routes:
      - source: /artboard/*
        destination: /artboard/index.html
      - source: /*
        destination: /index.html
    headers:
      - path: /*
        name: Cache-Control
        value: no-cache
```

2. Create a special `render-build.sh` script in the root directory:

```bash
#!/usr/bin/env bash
# Exit on error
set -e

# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Build all applications
pnpm nx run client:build:production
pnpm nx run artboard:build:production
pnpm nx run server:build:production

# Apply database migrations (if needed)
# pnpm prisma:migrate
```

3. Make the script executable:
```
chmod +x render-build.sh
```

## Step 3: Deploy to Render

### Option 1: Using the Blueprint (render.yaml)

1. Push your code with the render.yaml file to GitHub
2. Log in to your Render dashboard
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will detect the render.yaml file and set up all services
6. Complete the setup by providing required environment variables

### Option 2: Manual Setup

#### Deploy the Backend Service

1. In Render dashboard, go to "Web Services"
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: ez-resume-api
   - Environment: Node
   - Build Command: `./render-build.sh`
   - Start Command: `node dist/apps/server/main.js`
   - Add Environment Variables:
     - NODE_ENV: production
     - DATABASE_PROVIDER: mongodb
     - DATABASE_URL: your-mongodb-connection-string
     - PORT: 3000
     - ACCESS_TOKEN_SECRET: generate-a-secure-random-string
     - REFRESH_TOKEN_SECRET: generate-a-secure-random-string
5. Click "Create Web Service"

#### Deploy the Frontend Static Site

1. In Render dashboard, go to "Static Sites"
2. Click "New Static Site"
3. Connect your GitHub repository
4. Configure the site:
   - Name: ez-resume-web
   - Build Command: `pnpm install && pnpm nx run client:build:production && pnpm nx run artboard:build:production`
   - Publish Directory: `dist/apps/client`
   - Add Environment Variables:
     - NODE_ENV: production
5. Click "Create Static Site"
6. Configure redirects in the site settings:
   - Add a redirect for `/artboard/*` → `/artboard/index.html` with 200 status code
   - Add a redirect for `/*` → `/index.html` with 200 status code

## Step 4: Connect Services

1. In the backend service environment settings:
   - Add PUBLIC_URL: set to your frontend static site URL
   - Add STORAGE_URL: set to your frontend static site URL + '/storage'

2. Set up CORS:
   - Ensure your backend allows requests from your static site domain

## Step 5: Test Your Deployment

1. Wait for all deployments to complete
2. Visit your static site URL to access the frontend
3. Try signing up and creating a resume to verify everything is working

## Troubleshooting

### Database Connection Issues
- Ensure your MongoDB connection string is correctly formatted
- Check if your IP whitelist in MongoDB Atlas includes Render's IPs
- Verify database credentials are correct

### Build Failures
- Check build logs in Render dashboard
- Verify all dependencies are correctly listed in package.json
- Ensure all environment variables are set correctly

### API Not Working
- Check server logs in Render dashboard
- Test API endpoints directly using the API URL
- Verify CORS settings allow requests from your static site

## Continuous Deployment

Render automatically deploys your application when you push changes to your GitHub repository. To update your application:

1. Make changes to your code
2. Commit and push to GitHub
3. Render will automatically rebuild and deploy your application

## Custom Domains

1. In your static site settings, go to "Custom Domains"
2. Add your custom domain
3. Update your DNS settings according to Render's instructions
4. Update the PUBLIC_URL environment variable in your backend service

## Need Help?

If you encounter issues during deployment, please:
1. Check the [Render documentation](https://render.com/docs)
2. Look at the build and runtime logs in the Render dashboard
3. Open an issue in the [EZ Resume GitHub repository](https://github.com/Nityanand17/ez-resume/issues) 