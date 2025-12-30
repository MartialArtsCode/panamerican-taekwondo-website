import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import postsRoutes from './routes/posts.js';
import adminRoutes from './routes/admin.js';
import eventsRoutes from './routes/events.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});

// Store connected users
let users = {};

io.on('connection', (socket) => {
  console.log('✅ Socket connected:', socket.id);

  // Register user with username + role
  socket.on('registerUser', ({ username, role }) => {
    users[socket.id] = { username, role };
    console.log(`${username} (${role}) registered`);
  });

  // Admin-only mass message
  socket.on('sendMassMessage', ({ message, role }) => {
    if (role !== "admin") {
      socket.emit('errorMessage', { text: "Permission denied: only admins can send mass messages." });
      return;
    }
    // Broadcast personalized messages
    Object.entries(users).forEach(([id, user]) => {
      io.to(id).emit('personalMessage', {
        text: `${message}, ${user.username}!`
      });
    });
  });

  // Send a welcome message to the client
  socket.emit('welcome', { message: 'Hello from server!' });

  // Listen for test events from client
  socket.on('pingServer', (data) => {
    console.log('Received from client:', data);
    socket.emit('pongClient', { message: 'Pong from server!' });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log('❌ Socket disconnected:', socket.id);
  });
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventsRoutes);

export { io };
server.listen(5000, () => console.log('Server running on http://localhost:5000'));
