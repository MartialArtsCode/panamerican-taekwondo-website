import express from 'express';
import { awardBadge, updateRank, addAchievement } from '../controllers/adminController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/badge/:userId', isAdmin, awardBadge);
router.post('/rank/:userId', isAdmin, updateRank);
router.post('/achievement/:userId', isAdmin, addAchievement);

export default router;
