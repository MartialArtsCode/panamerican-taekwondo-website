import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { useNotification } from '../context/NotificationContext';
import { Box, Typography, Card, CardContent, CardMedia, Button, TextField, Modal } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import { getPosts, createPost } from '../api/endpoints';

const Feed = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ author: user?.name || 'Anonymous', content: '', file: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Fetch posts from backend
    async function fetchPosts() {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        setPosts([]); // fallback to empty
      }
    }
    fetchPosts();

    // Socket.io events
    socket.on('welcome', (data) => {
      showNotification(data.message, 'info');
    });
    socket.on('newPost', (post) => {
      showNotification('New post added!', 'info');
      setPosts(prev => [post, ...prev]);
    });
    socket.on('pongClient', (data) => {
      showNotification(data.message, 'info');
    });
    socket.emit('pingServer', { message: 'Ping from client!' });

    return () => {
      socket.off('welcome');
      socket.off('newPost');
      socket.off('pongClient');
    };
  }, [showNotification]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPost({ author: user?.name || 'Anonymous', content: '', file: null });
    setPreview(null);
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddPost = async (newPost) => {
    const formData = new FormData();
    formData.append('author', newPost.author);
    formData.append('content', newPost.content);
    if (newPost.file) formData.append('media', newPost.file);
    const res = await createPost(formData);
    setPosts([res.data, ...posts]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddPost(newPost);
    handleClose();
  };

  // Callback when a new post is created
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // prepend new post
  };

  return (
    <Box p={{ xs: 1, sm: 2, md: 4 }} maxWidth={600} mx="auto">
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} mb={2} gap={2}>
        <Typography variant="h4" fontSize={{ xs: 24, sm: 32 }}>Feed</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} fullWidth={true} sx={{ minWidth: { xs: '100%', sm: 120 } }}>
          Create Post
        </Button>
      </Box>
      {/* Post creation modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', mx: 'auto', my: 10, borderRadius: 2, boxShadow: 3, maxWidth: 400 }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="What's on your mind?"
              name="content"
              value={newPost.content}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <Button variant="outlined" component="label" fullWidth={true}>
              Upload Media
              <input type="file" hidden accept="image/*,video/*" onChange={handleFileChange} />
            </Button>
            {preview && (
              <CardMedia component="img" image={preview} alt="Preview" sx={{ maxHeight: 200, mb: 2 }} />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth={true}>
              Post
            </Button>
          </form>
        </Box>
      </Modal>
      {/* Posts list */}
      <Box>
        {posts.length === 0 ? (
          <Typography>No posts yet.</Typography>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={user}
              onDelete={id => setPosts(posts.filter(p => p._id !== id))}
              onEdit={updated => setPosts(posts.map(p => p._id === updated._id ? updated : p))}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Feed;
