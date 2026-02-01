const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

// Basic test route (before DB connection)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
    database: 'Connecting...'
  });
});

// Connect to MongoDB Atlas first
connectDB()
  .then(() => {
    console.log('📁 Loading routes after successful database connection...');
    
    // Mount routes
    app.use('/api/auth', authRoutes);
    app.use('/api/student', studentRoutes);
    app.use('/api/mentors', mentorRoutes);
    
    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: '🎯 Career Portal API with MongoDB Atlas',
        version: '1.0.0',
        database: 'MongoDB Atlas (Cloud)',
        status: 'Connected',
        timestamp: new Date(),
        endpoints: {
          auth: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            getMe: 'GET /api/auth/me (protected)'
          },
          student: {
            dashboard: 'GET /api/student/dashboard (protected, student role)'
          },
          mentors: {
            list: 'GET /api/mentors (protected)'
          },
          health: 'GET /health'
        }
      });
    });
    
    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    });
    
    // Error handler
    app.use((err, req, res, next) => {
      console.error('Server error:', err.stack);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
      });
    });
    
    // Start server
    //const PORT = process.env.PORT || 5000;
    const PORT = 5001;
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`💾 Database: MongoDB Atlas (Cloud)`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
      console.log('='.repeat(50));
    });
  })
  .catch(error => {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  });