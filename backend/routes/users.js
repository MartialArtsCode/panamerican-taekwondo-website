import express from 'express';
import User from '../models/User.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// GET /api/auth/users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().populate('badges'); // include badge info
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
