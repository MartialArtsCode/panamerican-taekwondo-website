import express from 'express';
import multer from 'multer';
import { getPosts, createPost, updatePost, deletePost, likePost, addComment, deleteComment } from '../controllers/postsController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Multer config for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
});

// GET /api/posts
router.get('/', getPosts);

// POST /api/posts
router.post('/', upload.single('media'), createPost);

// PUT /api/posts/:id
router.put('/:id', isAdmin, updatePost);

// DELETE /api/posts/:id
router.delete('/:id', isAdmin, deletePost);

// POST /api/posts/:id/like
router.post('/:id/like', likePost);

// POST /api/posts/:id/comment
router.post('/:id/comment', addComment);

// DELETE /api/posts/:id/comments/:commentId
router.delete('/:id/comments/:commentId', deleteComment);

export default router;
