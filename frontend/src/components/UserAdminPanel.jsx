import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Avatar } from '@mui/material';

const UserAdminPanel = ({ user }) => {
  const [badgeId, setBadgeId] = useState("");
  const [rank, setRank] = useState("");
  const [achievement, setAchievement] = useState("");

  const awardBadge = async () => {
    await fetch(`http://localhost:5000/api/admin/badge/${user._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ badgeId }),
    });
  };

  const updateRank = async () => {
    await fetch(`http://localhost:5000/api/admin/rank/${user._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ rank }),
    });
  };

  const addAchievement = async () => {
    await fetch(`http://localhost:5000/api/admin/achievement/${user._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ achievement }),
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2">Rank: {user.rank}</Typography>
        <Typography variant="body2">Badges: {user.badges?.map(b => b.name).join(', ')}</Typography>
        <Typography variant="body2">Achievements: {user.achievements?.join(', ')}</Typography>

        <TextField label="Badge ID" value={badgeId} onChange={e => setBadgeId(e.target.value)} />
        <Button onClick={awardBadge}>Award Badge</Button>

        <TextField label="Rank" value={rank} onChange={e => setRank(e.target.value)} />
        <Button onClick={updateRank}>Update Rank</Button>

        <TextField label="Achievement" value={achievement} onChange={e => setAchievement(e.target.value)} />
        <Button onClick={addAchievement}>Add Achievement</Button>
      </CardContent>
    </Card>
  );
};

export default UserAdminPanel;
