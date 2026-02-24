import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const signup = async (email, password, name) => {
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email already in use');
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    name,
  });

  const token = generateToken(user._id);
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};

export const login = async (email, password) => {
  // Validate email and password
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    console.log(`Login failed: User not found with email: ${email}`);
    throw new Error('Invalid credentials');
  }

  console.log(`User found: ${email}, verifying password...`);

  // Check if passwords match
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log(`Login failed: Incorrect password for user: ${email}`);
    throw new Error('Invalid credentials');
  }

  console.log(`Login successful for user: ${email}`);
  const token = generateToken(user._id);
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};
