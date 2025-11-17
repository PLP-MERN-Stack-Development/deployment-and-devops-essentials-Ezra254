import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173', // Vite default port
    ].filter(Boolean); // Remove undefined values
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin exactly
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // For Vercel deployments, allow any vercel.app subdomain
    // This handles cases where Vercel generates different URLs
    if (origin && origin.includes('.vercel.app')) {
      console.log(`✅ Allowing Vercel origin: ${origin}`);
      return callback(null, true);
    }
    
    // If no FRONTEND_URL is set, allow all origins (development mode)
    if (!process.env.FRONTEND_URL) {
      console.log(`⚠️ No FRONTEND_URL set, allowing origin: ${origin}`);
      return callback(null, true);
    }
    
    // Origin not allowed
    console.warn(`⚠️ CORS blocked request from origin: ${origin}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
    console.log(`Note: Vercel URLs are automatically allowed`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/tasks', taskRoutes);

// Log all API requests (helpful for debugging)
app.use('/api', (req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Task Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      tasks: '/api/tasks'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// MongoDB connection with connection pooling
const connectDB = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables. Please create a .env file with your MongoDB connection string.');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('MONGODB_URI is not defined')) {
      console.error('\n💡 Solution: Create a .env file in the backend directory with:');
      console.error('   MONGODB_URI=your_mongodb_connection_string\n');
    } else if (error.message.includes('authentication failed')) {
      console.error('\n💡 Solution: Check your MongoDB username and password in the connection string\n');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Solution: Check your MongoDB cluster URL and network connectivity\n');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Solution: Check your IP whitelist in MongoDB Atlas settings\n');
    }
    
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await mongoose.connection.close();
  process.exit(0);
});

