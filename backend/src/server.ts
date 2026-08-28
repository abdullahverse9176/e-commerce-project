import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Backend Server is running smoothly',
    database: getDBStatus() ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
