// middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '@/model/users';

const auth = async (req) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      console.error('No token provided');
      return false;
    }

    // Verify the token's validity without decoding
    jwt.verify(token, "12"|| 'test');
    return true; // Successful authentication
  } catch (error) {
    console.error('Authentication error:', error.message);
    return false;
  }
};

export default auth;
