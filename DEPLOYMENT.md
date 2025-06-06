# EZ Resume - Deployment Guide

This guide explains how to deploy the entire EZ Resume application (client, server, and artboard) at once on Vercel.

## Vercel Monorepo Deployment (Recommended)

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- A [GitHub account](https://github.com/signup)
- A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) for database

### Step 1: Prepare Your MongoDB Database
1. Create a MongoDB Atlas cluster (free tier is sufficient to start)
2. Set up a database user with read/write permissions
3. Configure network access to allow connections from anywhere (or Vercel's IP ranges)
4. Get your MongoDB connection string

### Step 2: Fork and Push to GitHub
1. Fork this repository or push your code to your GitHub account
2. Make sure your code is ready for production

### Step 3: Set Up Vercel Project
1. Log in to your Vercel account
2. Click "Import Project" or "New Project"
3. Select your GitHub repository with the EZ Resume code
4. Vercel will automatically detect the NX monorepo structure
5. Configure build settings:
   - Framework Preset: Other
   - Root Directory: `/` (root of the monorepo)
   - Build Command: `pnpm vercel-build`
   - Output Directory: `dist/apps/client`
   - Development Command: `pnpm dev`

### Step 4: Set Environment Variables
Add the following environment variables in your Vercel project settings:

| Variable Name | Description | Example Value |
| --- | --- | --- |
| NODE_ENV | Environment type | production |
| DATABASE_PROVIDER | Database provider | mongodb |
| DATABASE_URL | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/ezresume |
| ACCESS_TOKEN_SECRET | Random string for JWT | (generate a random secure string) |
| REFRESH_TOKEN_SECRET | Random string for JWT | (generate a random secure string) |
| PUBLIC_URL | Your Vercel app URL | https://your-app-name.vercel.app |
| STORAGE_URL | Storage URL | https://your-app-name.vercel.app/storage |
| PORT | Application port | 3000 |

### Step 5: Deploy and Verify
1. Click "Deploy"
2. Wait for the build to complete
3. Your app is now live at your Vercel URL!
4. Verify that:
   - The client is accessible at the root URL (https://your-app-name.vercel.app)
   - The artboard is accessible at /artboard (https://your-app-name.vercel.app/artboard)
   - The server API is accessible at /api (https://your-app-name.vercel.app/api)

## How Vercel Monorepo Deployment Works

This project uses a unified deployment approach where:

1. The **Client** frontend is deployed as the main application at the root path
2. The **Artboard** is served under the /artboard path
3. The **Server** API is deployed as serverless functions under the /api path

### NX Monorepo Configuration

Our configuration in `vercel.json` and `package.json` ensures:

- All applications are built during deployment with the `vercel-build` script
- API routes are correctly mapped to the server application
- Static assets are served from the correct paths
- The routing rewrites ensure proper paths for all components

## Troubleshooting Deployment Issues

### Database Connection Issues
- Verify your MongoDB connection string is correct
- Ensure the database user has proper permissions
- Check if network access is configured correctly

### Build Failures
- Check the Vercel deployment logs
- Make sure all dependencies are listed in package.json
- Verify that environment variables are set correctly

### API Not Working
- Check the Functions logs in Vercel dashboard
- Verify that the API routes are configured correctly
- Make sure the serverless function timeout is adequate

## Monitoring Your Deployment

After deploying, Vercel provides several tools to monitor your application:

1. **Analytics**: Track page views, API requests, and performance
2. **Logs**: View server logs for debugging
3. **Functions**: Monitor serverless function performance
4. **Deployments**: Track deployment history and roll back if needed

## Custom Domain Setup

1. In your Vercel project, go to "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Update your PUBLIC_URL environment variable to match your custom domain

## Need Help?

If you encounter issues during deployment, please:
1. Check the [issues](https://github.com/Nityanand17/ez-resume/issues) page
2. Open a new issue if you can't find a solution
3. Provide detailed information about the problem 