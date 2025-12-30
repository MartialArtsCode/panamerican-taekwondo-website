import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import { Box, Typography } from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Administrator Dashboard</Typography>
      <UserList users={users} />
    </Box>
  );
};

export default AdminDashboard;
