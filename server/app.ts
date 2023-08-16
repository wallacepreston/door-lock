// load env vars
import dotenv from 'dotenv';
dotenv.config();

// Import express
import express from 'express';
// Import Seam
import { Seam } from "seamapi";

const apiKey = process.env.SEAM_API_KEY;

// Seam will automatically use the SEAM_API_KEY environment variable if you
// don't provide an apiKey to `new Seam()`
const seam = new Seam(apiKey);

const checkAuth = async () => {
  const workspace = await seam.workspaces.get();
  return workspace;
}

// Create a new express app instance
const app = express();

// Configure Express to parse JSON
app.use(express.json());

// Make the PORT configurable
const { PORT = 3000 } = process.env;

// GET /
app.get('/api', (req, res) => {
  res.send('hello world');
});

// GET /check-auth
app.get('/api/check-auth', async (req, res) => {
  const workspace = await seam.workspaces.get();
  if (! workspace) {
    return res.status(401).send('not authenticated');
  } else {
    return res.send(workspace);
  }
});

// POST /lock
app.post('/api/lock', (req, res) => {
  res.send('locked');
});

// Start the Express server, displaying the localhost URL
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});