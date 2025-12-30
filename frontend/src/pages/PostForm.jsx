import React, { useState } from 'react';
import { Box, TextField, Button, CardMedia } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

const PostForm = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (media) formData.append('media', media);
    formData.append('user', user?.name || 'Anonymous');
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });
      const post = await res.json();
      if (onPostCreated) onPostCreated(post);
      setText('');
      setMedia(null);
      setPreview(null);
    } catch (err) {
      // handle error
    }
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="What's on your mind?"
          value={text}
          onChange={handleTextChange}
          multiline
          rows={3}
          fullWidth
        />
        <Button variant="outlined" component="label">
          Upload Media
          <input type="file" hidden accept="image/*,video/*" onChange={handleFileChange} />
        </Button>
        {preview && (
          <CardMedia component="img" image={preview} alt="Preview" sx={{ maxHeight: 200, mb: 2 }} />
        )}
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
