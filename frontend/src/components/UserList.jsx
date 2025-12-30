import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Avatar } from '@mui/material';
import UserAdminPanel from './UserAdminPanel';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // admin JWT
        }
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>All Registered Users</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <Avatar src={user.avatarUrl} alt={user.name} />
            <Box ml={2}>
              <Typography variant="body1">{user.name}</Typography>
              <Typography variant="body2">Rank: {user.rank}</Typography>
              <Typography variant="body2">
                Badges: {user.badges.map(b => b.name).join(', ')}
              </Typography>
              <Typography variant="body2">
                Achievements: {user.achievements.join(', ')}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box mt={4}>
        {users.map(user => (
          <UserAdminPanel key={user._id} user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default UserList;
