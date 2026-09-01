import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/categoryRoute';
import categoryRoute from './routes/categoryRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()

app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoute);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
