import Post from '../models/Post.js';
import { notifyNewPost } from '../server.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { author, content } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({ author, content, mediaUrl });
    await newPost.save();

    // Emit socket event
    notifyNewPost(newPost);

    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Update an existing post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
    } else {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ author: req.user._id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Delete a comment from a post
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const commentId = req.params.commentId;
    // Only allow author of comment or admin to delete
    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }
    comment.remove();
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
