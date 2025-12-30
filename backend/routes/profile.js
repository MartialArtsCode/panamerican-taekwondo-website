import express from 'express';
import { updateProfile } from '../controllers/profileController.js';
import multer from 'multer';

const router = express.Router();

// Multer config for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /api/profile
router.post('/', upload.single('avatar'), updateProfile);

export default router;
