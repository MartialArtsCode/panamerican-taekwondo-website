import { useAuth } from '../auth/AuthContext';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { socket } from '../socket';
import { useNotification } from '../context/NotificationContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      socket.emit('registerUser', { username: user.name, role: user.role });
    }
    socket.on('personalMessage', (data) => {
      showNotification(data.text, 'info');
    });
    socket.on('errorMessage', (data) => {
      showNotification(data.text, 'error');
    });
    return () => {
      socket.off('personalMessage');
      socket.off('errorMessage');
    };
  }, [user, showNotification]);

  // Admin: send mass message
  const handleMassMessage = () => {
    const message = prompt('Enter mass message:');
    if (message && user?.role === 'admin') {
      socket.emit('sendMassMessage', { message, role: user.role });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name}!
      </h1>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={logout}
      >
        Logout
      </Button>
      {user?.role === 'admin' && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
          onClick={handleMassMessage}
        >
          Send Mass Message
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
