import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Dashboard</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      {/* Add dashboard content here */}
    </Box>
  );
};

export default Dashboard;
