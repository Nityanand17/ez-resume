// This file is used as the entry point for Vercel serverless functions
const server = require('../dist/apps/server/main.js');

// Export the server module
module.exports = async (req, res) => {
  // Forward the request to the NestJS application
  return server.handler(req, res);
}; 