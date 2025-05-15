# EZ Resume

A modern, free and open-source resume builder that simplifies creating, updating, and sharing your professional resume.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-4.4.4-green.svg)

## 🚀 Features

- **Modern UI**: Clean, responsive design with a beautiful user interface
- **Real-time Editor**: See changes as you make them
- **Multiple Designs**: Choose from various resume templates
- **Easy Sharing**: Share your resume with a public link
- **Data Privacy**: Your data stays on your device and in your account
- **Export Options**: Download as PDF, JSON
- **Cross-Platform**: Works on desktop and mobile
- **Dark Mode**: Comfortable viewing in low-light environments

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: NestJS, Prisma
- **Database**: SQLite (development), MongoDB (production)
- **Internationalization**: Lingui
- **State Management**: Zustand
- **Build Tools**: NX Monorepo

## 📋 Prerequisites

- Node.js (>=22.13.1)
- pnpm
- Git

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Nityanand17/ez-resume.git
cd ez-resume

# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Create the database and run migrations
pnpm prisma:migrate:dev

# Run the development server
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Resume Artboard: http://localhost:6173/artboard
- API: http://localhost:3000/api

## 🏗️ Project Structure

```
ez-resume/
├── apps/                  # Application code
│   ├── client/            # React frontend
│   ├── server/            # NestJS backend
│   └── artboard/          # Resume preview component
├── libs/                  # Shared libraries
│   ├── dto/               # Data Transfer Objects
│   ├── schema/            # Database schemas
│   └── utils/             # Utility functions
├── tools/                 # Development tools
│   ├── prisma/            # Database schema and migrations
│   └── compose/           # Docker compose files
├── storage/               # File storage 
└── package.json           # Project configuration
```

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./tools/prisma/dev.db

# JWT Authentication
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# App Configuration
PORT=3000
PUBLIC_URL=http://localhost:3000
STORAGE_URL=http://localhost:3000/storage
```

## 🌍 Deployment

### Vercel Deployment (All Apps at Once)

EZ Resume is configured to deploy the client, server, and artboard as a unified application on Vercel.

1. Connect your GitHub repository to Vercel
2. Use the following settings:
   - Build Command: `pnpm vercel-build`
   - Output Directory: `dist/apps/client`
3. Set the required environment variables in your Vercel project
4. Deploy and enjoy your all-in-one resume builder!

For detailed instructions, see the [Vercel Deployment Guide](DEPLOYMENT.md).

### Render Deployment

You can also deploy EZ Resume on Render with a similar unified approach:

1. Set up a Web Service for the backend API
2. Set up a Static Site for the frontend and artboard
3. Connect them with the appropriate environment variables

For step-by-step instructions, see the [Render Deployment Guide](RENDER_DEPLOYMENT.md).

### Docker Deployment

```bash
# Build the Docker image
docker build -t ez-resume .

# Run the container
docker run -p 3000:3000 ez-resume
```

## 👨‍💻 Development

```bash
# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate:dev

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format:fix
```

## 🔄 Database Management

### Switching Between SQLite and MongoDB

1. Update the `DATABASE_PROVIDER` and `DATABASE_URL` in your `.env` file
2. Regenerate the Prisma client: `pnpm prisma:generate`
3. Run migrations: `pnpm prisma:migrate:dev`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## 🙏 Acknowledgements

- Built on the foundation of [Reactive Resume](https://github.com/AmruthPillai/Reactive-Resume)
- UI components from Radix UI
- Icons from Phosphor Icons

---

Made with ❤️ by [Nityanand Yadav](https://nityanand.vercel.app) 