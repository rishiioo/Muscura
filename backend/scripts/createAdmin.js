const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin';

    if (!email || !password) {
      console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/muscura');

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    // Pass the plain password; the User model's pre-save hook hashes it automatically.
    const admin = new User({
      name,
      email,
      password,
      role: 'admin',
    });

    await admin.save();
    console.log(`Admin user created: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();