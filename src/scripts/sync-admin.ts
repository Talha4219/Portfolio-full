import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User';

const syncAdmin = async () => {
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

    console.log(`Syncing user: ${email}`);

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      console.log('User not found. Creating new admin user...');
      user = new User({
        email,
        password,
        role: 'admin'
      });
      await user.save();
      console.log('Admin user created successfully.');
    } else {
      console.log('User found. Updating password...');
      user.password = password; // pre-save hook will hash this
      user.role = 'admin'; // Ensure role is admin
      await user.save();
      console.log('Admin user password updated successfully.');
    }

  } catch (error) {
    console.error('Error syncing admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

syncAdmin();
