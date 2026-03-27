import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes';
import { errorHandler } from './src/middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Matcha API' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

app.use('/api', routes); // All routes begins by /api

app.use(errorHandler); // Global error handler

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
