import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User';

const verifyLogin = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in your .env file');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
      process.exit(1);
    }

    console.log(`Checking user: ${email}`);

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found in database.');
    } else {
      console.log('User found.');
      console.log(`Role: ${user.role}`);
      
      const isMatch = await user.matchPassword(password);
      if (isMatch) {
        console.log('Password match: SUCCESS');
        console.log('Sign in should work with these credentials.');
      } else {
        console.log('Password match: FAILED');
        console.log('The password in .env does not match the one in the database.');
      }
    }

  } catch (error) {
    console.error('Error verifying login:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

verifyLogin();
