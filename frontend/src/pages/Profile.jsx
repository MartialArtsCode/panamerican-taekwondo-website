import React, { useState } from 'react';
import { updateProfile } from '../api/endpoints';
import { useAuth } from '../auth/AuthContext';
import { Box, Avatar, Typography, Button, Modal, TextField } from '@mui/material';

const Profile = () => {
  const { user, setUser } = useAuth(); // expose setUser in AuthContext
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [preview, setPreview] = useState(user?.avatarUrl || null);
  const [file, setFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // temporary preview
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('email', editData.email);
    if (file) formData.append('avatar', file);

    try {
      const response = await updateProfile(formData);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    handleClose();
  };

  return (
    <Box p={4} maxWidth={500} mx="auto">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar src={preview} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h5">{user?.name || 'User Name'}</Typography>
        <Typography variant="body1" color="textSecondary">{user?.email || 'user@email.com'}</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpen}>
          Edit Profile
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', mx: 'auto', my: 10, borderRadius: 2, boxShadow: 3, maxWidth: 400 }}>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <TextField label="Name" name="name" value={editData.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={editData.email} onChange={handleChange} fullWidth />

            <Button variant="outlined" component="label">
              Upload Avatar
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
