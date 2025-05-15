# Deploying EZ Resume on Vercel

This guide walks through the steps needed to deploy the EZ Resume application on Vercel.

## Prerequisites

1. [Vercel account](https://vercel.com/signup)
2. [GitHub account](https://github.com/signup) (for source code hosting)
3. [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (for database)
4. [SMTP service provider](https://sendgrid.com/ or https://www.mailgun.com/) (for sending emails)

## Deployment Steps

### 1. Set Up MongoDB Atlas

1. Create a new MongoDB Atlas cluster
2. Configure network access to allow connections from anywhere (or use Vercel's IP ranges)
3. Create a database user with read/write permissions
4. Get your MongoDB connection string, which should look like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
   ```

### 2. Push Your Code to GitHub

1. Create a new GitHub repository
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

### 3. Deploy on Vercel

1. Log in to your Vercel account
2. Click "Import Project" or "New Project"
3. Select your GitHub repository
4. Configure the project with the following settings:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm vercel-build`
   - **Output Directory**: `dist/apps/client`
   - **Development Command**: `pnpm dev`

5. Set up the following environment variables:
   
   | Variable Name | Description | Example Value |
   | --- | --- | --- |
   | NODE_ENV | Environment type | production |
   | PORT | Application port | 3000 |
   | PUBLIC_URL | Your Vercel app URL | https://your-app-name.vercel.app |
   | STORAGE_URL | Storage URL | https://your-app-name.vercel.app/storage |
   | DATABASE_URL | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/ezresume |
   | ACCESS_TOKEN_SECRET | Random string for JWT | (generate a random secure string) |
   | REFRESH_TOKEN_SECRET | Random string for JWT | (generate a random secure string) |
   | MAIL_FROM | Email sender address | noreply@yourdomain.com |
   | SMTP_URL | SMTP server URL | smtp://username:password@smtp.yourdomain.com:587 |

6. Click "Deploy"

### 4. Setting Up Custom Domain (Optional)

1. In your Vercel project, go to the "Domains" section
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS records

### 5. Monitoring and Logs

1. Use the Vercel dashboard to monitor your application
2. Check deployment logs if there are any issues
3. Use the "Functions" tab to monitor serverless function performance

### 6. Troubleshooting Common Issues

#### Database Connection Problems
- Make sure your MongoDB Atlas connection string is correct
- Ensure network access is properly configured in MongoDB Atlas

#### Build Failures
- Check the build logs for errors
- Make sure all environment variables are set correctly

#### Mail Service Issues
- Verify your SMTP settings
- Test email sending functionality

## Maintenance and Updates

1. To update your application, simply push changes to your GitHub repository
2. Vercel will automatically build and deploy the updated version
3. Use Vercel's "Preview" feature to test changes before deploying to production

## Best Practices

1. Set up team access controls in Vercel for collaborative development
2. Use environment variables for sensitive information
3. Implement monitoring and alerts for your application
4. Regularly back up your MongoDB database 