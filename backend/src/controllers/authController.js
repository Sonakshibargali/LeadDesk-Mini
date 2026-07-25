import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

// Admin Login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Retrieve administrator
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-change-me';
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        email: admin.email
      }
    });
  } catch (error) {
    next(error);
  }
};
