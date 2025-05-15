# EZ Resume - Deployment Guide

This guide explains how to deploy EZ Resume to different platforms, with a focus on Vercel deployment.

## Vercel Deployment (Recommended)

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

### Step 3: Deploy on Vercel
1. Log in to your Vercel account
2. Click "Import Project" or "New Project"
3. Select your GitHub repository
4. Configure build settings:
   - Framework Preset: Other
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

### Step 5: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app is now live at your Vercel URL!

## Other Deployment Options

### Docker Deployment

```bash
# Build the Docker image
docker build -t ez-resume .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL=your_mongo_connection_string \
  -e ACCESS_TOKEN_SECRET=your_secret \
  -e REFRESH_TOKEN_SECRET=your_secret \
  -e PUBLIC_URL=http://your_domain \
  -e PORT=3000 \
  ez-resume
```

### Self-hosted Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the server:
   ```bash
   NODE_ENV=production pnpm start
   ```

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
- Check the server logs for errors
- Verify that the API routes are configured correctly
- Make sure the server port matches your environment variable

## Custom Domain Setup

1. In your Vercel project, go to "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Update your PUBLIC_URL environment variable to match your custom domain

## Maintenance

Once deployed, keep your application updated:

1. Push new changes to your GitHub repository
2. Vercel will automatically rebuild and deploy your application
3. Monitor your application for errors or performance issues
4. Regularly back up your database

## Need Help?

If you encounter issues during deployment, please:
1. Check the [issues](https://github.com/yourusername/ez-resume/issues) page
2. Open a new issue if you can't find a solution
3. Provide detailed information about the problem 