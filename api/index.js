// This file is used as the entry point for Vercel serverless functions
// Import the handler from the server's main.js file
const { handler } = require('../dist/apps/server/main.js');

// Export the server module as a Vercel serverless function
module.exports = async (req, res) => {
  // Forward the request to the NestJS application handler
  return handler(req, res);
}; 