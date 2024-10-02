import express from 'express';
import { dbConnect } from './src/app/lib/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use('/api/users', userRoutes);

app.use(cors({
  origin: ['http://localhost:3000', 'http://10.251.129.22:3000', 'http://10.251.129.22:3001'],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('internhut backend is running');
});


// Connect to the database
dbConnect();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});