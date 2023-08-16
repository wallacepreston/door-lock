// load env vars
import dotenv from 'dotenv';
dotenv.config();

// Import express
import express from 'express';
// Import Seam
import { Seam } from "seamapi";
import morgan from 'morgan';
import cors from 'cors';

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

// Enable CORS
app.use(cors());

// logging middleware
app.use(morgan('dev'));

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

// GET /lock
app.get('/api/lock', async (req, res) => {
  const devices = await seam.locks.list();
  const [someLock] = devices;
  return res.send(someLock);
});

// POST /lock
app.post('/api/lock', async (req, res) => {
  
  const devices = await seam.locks.list();
  const [someLock] = devices;
  
  let result;
  // If the lock is opened, lock it, else unlock it
  if (someLock.properties.locked) {
    result = await seam.locks.unlockDoor(someLock.device_id);
  } else {
    result = await seam.locks.lockDoor(someLock.device_id);
  }
  return res.send(result);
});

// Start the Express server, displaying the localhost URL
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});