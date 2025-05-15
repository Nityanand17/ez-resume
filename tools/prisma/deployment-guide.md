# Prisma Deployment Guide for Vercel

This guide provides instructions for deploying the application with Prisma to Vercel, supporting both SQLite (development) and MongoDB (production) environments.

## Environment Configuration

### Required Environment Variables

Add these environment variables to your Vercel project:

```
DATABASE_PROVIDER=mongodb
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ezresume
```

For local development with SQLite:
```
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./dev.db
```

## Database Migration

When using Vercel, we need to run migrations as part of the build process.

### Adding Migration to Build Process

For Vercel deployment, add the migration command to the build script in `package.json`:

```json
{
  "scripts": {
    "vercel-build": "pnpm prisma:generate && pnpm prisma:migrate && nx run client:build:production && nx run artboard:build:production"
  }
}
```

## MongoDB Atlas Configuration

When using MongoDB Atlas in production:

1. Create a MongoDB Atlas cluster
2. Configure network access to allow connections from anywhere (whitelist 0.0.0.0/0)
3. Create a database user with read/write permissions
4. Get your connection string from Atlas

## Troubleshooting

### Connection Issues
- Ensure your MongoDB connection string is correctly formatted
- Check that network access is properly configured in MongoDB Atlas
- Verify that the database user has the correct permissions

### Migration Failures
- Make sure the DATABASE_URL is correctly set
- Check that the database user has privileges to create collections

## Local Development

For local development, you can use SQLite:

1. Set `DATABASE_PROVIDER=sqlite` and `DATABASE_URL=file:./dev.db` in your .env file
2. Run `pnpm prisma:migrate:dev` to create the SQLite database and apply migrations
3. Run `pnpm prisma:generate` to generate the Prisma client

## Switching Between Environments

When switching between SQLite and MongoDB:

1. Update the `DATABASE_PROVIDER` and `DATABASE_URL` environment variables
2. Run `pnpm prisma:generate` to regenerate the Prisma client
3. Run the appropriate migration command 