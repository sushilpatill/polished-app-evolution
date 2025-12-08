import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import prisma from './lib/prisma';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import profileRoutes from './routes/profile';
import resumeRoutes from './routes/resumes_simple';
import webhookRoutes from './routes/webhooks';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Test database connection
prisma.$connect()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

// Security middleware
app.use(helmet());
app.use(morgan('dev'));

// CORS configuration - Allow multiple origins for development
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081', 
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Public routes (before authentication)
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'JobGenius AI Backend API',
    version: '1.0.0',
    status: 'running',
    authentication: 'Clerk',
    database: 'PostgreSQL (Supabase)',
    ai: 'Google Gemini',
    storage: 'Cloudinary',
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook route (before JSON parsing - needs raw body)
// app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Clerk middleware (for protected routes)
app.use(ClerkExpressWithAuth({
  // This makes authentication optional by default
  // Use requireAuth middleware on specific routes that need it
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resumes', resumeRoutes);

// Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(port, () => {
  console.log(`⚡️ Backend server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Authentication: Clerk`);
});

server.on('error', (error: any) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
