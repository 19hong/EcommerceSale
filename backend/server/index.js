import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

dotenv.config();

import connectDB from './config/db.js';
import configureCloudinary from './config/cloudinary.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

configureCloudinary();

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'EcommerceSale API' });
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'http://localhost:5000',
      'https://ecommercesale.onrender.com',
    ].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});
app.use('/api', limiter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log('Shutting down gracefully...');
    server.close(async () => {
      try {
        if (global.__MONGOD__) {
          await global.__MONGOD__.stop();
          console.log('In-memory MongoDB stopped');
        }
        await mongoose.connection.close();
      } catch (err) {
        console.log('Shutdown cleanup error (non-critical):', err.message);
      }
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer();
