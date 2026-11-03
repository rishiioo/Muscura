const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

// Environment variable validation
if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error('FATAL ERROR: JWT_SECRET or MONGODB_URI is not defined in environment variables.');
  process.exit(1);
}

// Connect to database
connectDB();

// Start cron job for expiry reminders if production or ENABLE_CRON=true
const startExpiryReminder = require('./jobs/expiryReminder');
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_CRON === 'true') {
  startExpiryReminder();
  console.log('Subscription expiry reminder cron job started.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());

// CORS configuration
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : '';
const isDev = process.env.NODE_ENV !== 'production';

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, '');
    if (clientUrl && cleanOrigin === clientUrl) return callback(null, true);
    if (isDev && cleanOrigin === 'http://localhost:3000') return callback(null, true);
    return callback(null, false);
  },
  credentials: true
};
app.use(cors(corsOptions));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login/register attempts, please try again after 15 minutes' }
});

// Apply general rate limit to all requests
app.use(generalLimiter);

// Apply strict rate limit to login and register routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Muscura Backend API Running' });
});

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const subscriptionRoutes = require('./routes/subscription');
const progressRoutes = require('./routes/progress');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;