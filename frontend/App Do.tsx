import React, { useState } from 'react';
import { Users, Calendar, Award, Bell, LogOut, UserCheck, BookOpen, MessageSquare, Image, Send, Plus, X, Camera, Trophy } from 'lucide-react';

const PanamericanTKDApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newPost, setNewPost] = useState({ text: '', image: null });
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [massMessageText, setMassMessageText] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' });
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Sample user database with profile pictures
  const [users] = useState({
    'admin': { 
      password: 'admin123', 
      role: 'Admin', 
      name: 'Master Kim',
      profilePic: '👤',
      bio: 'Head Instructor - 5th Dan Black Belt'
    },
    'admin2': { 
      password: 'admin2123', 
      role: 'Admin II', 
      name: 'Instructor Lee',
      profilePic: '👤',
      bio: 'Senior Instructor - 3rd Dan Black Belt'
    },
    'member': { 
      password: 'member123', 
      role: 'Members', 
      name: 'Carlos Martinez',
      profilePic: '👤',
      bio: 'Blue Belt - Training since 2024',
      badges: ['Attendance Champion', 'Tournament Bronze']
    }
  });

  // Students database with badges
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Carlos Martinez', 
      belt: 'Blue Belt', 
      status: 'Active',
      profilePic: '👤',
      badges: ['Attendance Champion', 'Tournament Bronze']
    },
    { 
      id: 2, 
      name: 'Maria Sanchez', 
      belt: 'Red Belt', 
      status: 'Active',
      profilePic: '👤',
      badges: ['Outstanding Progress', 'Team Spirit']
    },
    { 
      id: 3, 
      name: 'Juan Lopez', 
      belt: 'Black Belt 1st Dan', 
      status: 'Active',
      profilePic: '👤',
      badges: ['Tournament Gold', 'Leadership Award', 'Perfect Form']
    },
    { 
      id: 4, 
      name: 'Sofia Hernandez', 
      belt: 'Yellow Belt', 
      status: 'Active',
      profilePic: '👤',
      badges: ['Rookie Star']
    }
  ]);

  // Available badges that admins can assign
  const availableBadges = [
    'Attendance Champion', 'Tournament Gold', 'Tournament Silver', 'Tournament Bronze',
    'Outstanding Progress', 'Team Spirit', 'Leadership Award', 'Perfect Form',
    'Rookie Star', 'Discipline Master', 'Respect Award', 'Perseverance',
    'Black Belt Excellence', 'Community Service', 'Mentor', 'Sparring Champion'
  ];

  // Events calendar
  const [events, setEvents] = useState([
    { id: 1, title: 'Belt Testing', date: '2025-12-15', time: '10:00 AM', description: 'Quarterly belt promotion ceremony', type: 'testing' },
    { id: 2, title: 'Pan-American Tournament', date: '2025-12-20', time: '8:00 AM', description: 'Regional championship competition', type: 'tournament' },
    { id: 3, title: 'Family Training Day', date: '2025-12-10', time: '2:00 PM', description: 'Special class for families', type: 'special' },
    { id: 4, title: 'Black Belt Seminar', date: '2025-12-28', time: '6:00 PM', description: 'Advanced techniques workshop', type: 'training' }
  ]);

  // Social feed posts
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      author: 'Juan Lopez',
      authorPic: '👤',
      text: 'Just earned my Black Belt! Thank you Master Kim and everyone at the academy! 🥋',
      image: '🖼️',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'Maria Sanchez',
      authorPic: '👤',
      text: 'Great tournament today! Proud to represent Panamerican TKD Academy 🏆',
      image: '🖼️',
      likes: 18,
      comments: 5,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      author: 'Master Kim',
      authorPic: '👤',
      text: 'Congratulations to all our students who tested today. Your dedication shows! 💪',
      image: null,
      likes: 45,
      comments: 12,
      timestamp: '1 day ago'
    }
  ]);

  // Messages/Chats
  const [messages, setMessages] = useState([
    {
      id: 1,
      participants: ['Carlos Martinez', 'Master Kim'],
      messages: [
        { sender: 'Carlos Martinez', text: 'Master Kim, when is the next belt test?', timestamp: '10:30 AM' },
        { sender: 'Master Kim', text: 'December 15th. Make sure you practice your poomsae!', timestamp: '10:45 AM' }
      ]
    },
    {
      id: 2,
      participants: ['Maria Sanchez', 'Carlos Martinez'],
      messages: [
        { sender: 'Maria Sanchez', text: 'Want to practice sparring after class?', timestamp: 'Yesterday' },
        { sender: 'Carlos Martinez', text: 'Sure! See you at 6 PM', timestamp: 'Yesterday' }
      ]
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'event', text: 'Belt Testing scheduled for Dec 15th', read: false, timestamp: '1 hour ago' },
    { id: 2, type: 'message', text: 'New message from Master Kim', read: false, timestamp: '2 hours ago' },
    { id: 3, type: 'badge', text: 'You earned a new badge: Attendance Champion!', read: false, timestamp: '1 day ago' },
    { id: 4, type: 'announcement', text: 'Tournament registration is now open', read: true, timestamp: '2 days ago' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users[loginForm.username];
    if (user && user.password === loginForm.password) {
      setCurrentUser({ ...user, username: loginForm.username });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginForm({ username: '', password: '' });
    setActiveTab('dashboard');
  };

  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      const post = {
        id: feedPosts.length + 1,
        author: currentUser.name,
        authorPic: currentUser.profilePic,
        text: newPost.text,
        image: newPost.image,
        likes: 0,
        comments: 0,
        timestamp: 'Just now'
      };
      setFeedPosts([post, ...feedPosts]);
      setNewPost({ text: '', image: null });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const updatedMessages = messages.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: currentUser.name, text: newMessage, timestamp: 'Just now' }]
          };
        }
        return chat;
      });
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleMassMessage = () => {
    if (massMessageText.trim()) {
      const notification = {
        id: notifications.length + 1,
        type: 'announcement',
        text: massMessageText,
        read: false,
        timestamp: 'Just now'
      };
      setNotifications([notification, ...notifications]);
      setMassMessageText('');
      setShowMessageModal(false);
      alert('Mass message sent to all members!');
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        type: 'special'
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', description: '' });
      setShowEventModal(false);
    }
  };

  const handleAddBadge = (badge) => {
    if (selectedStudent) {
      const updatedStudents = students.map(student => {
        if (student.id === selectedStudent.id) {
          const badges = student.badges || [];
          if (!badges.includes(badge)) {
            return { ...student, badges: [...badges, badge] };
          }
        }
        return student;
      });
      setStudents(updatedStudents);
      setShowBadgeModal(false);
      setSelectedStudent(null);
    }
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <img 
                src="https://via.placeholder.com/150x150/DC2626/FFFFFF?text=PTA+Logo" 
                alt="Panamerican Taekwondo Academy Logo" 
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Panamerican Taekwondo Academy</h1>
            <p className="text-gray-600">Member Portal Login</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
              type="text"
              value={loginForm.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginForm({...loginForm, username: e.target.value})}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleLogin(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Login
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Admin II: admin2 / admin2123</p>
            <p>Member: member / member123</p>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Tabs
  const NavTabs = () => (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'calendar' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'feed' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Community Feed
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'messages' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'notifications' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          {currentUser.role === 'Admin' && (
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'students' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Students
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Calendar Tab
  const CalendarTab = () => (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Events Calendar</h2>
        {currentUser.role === 'Admin' && (
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Plus size={20} /> Add Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.type === 'tournament' ? 'bg-yellow-100 text-yellow-800' :
                event.type === 'testing' ? 'bg-purple-100 text-purple-800' :
                event.type === 'training' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {event.type}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {event.date}
              </p>
              <p className="flex items-center gap-2">
                ⏰ {event.time}
              </p>
              <p className="mt-3">{event.description}</p>
            </div>
            {currentUser.role === 'Members' && (
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                RSVP
              </button>
            )}
          </div>
        ))}
      </div>

      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Create Event</h3>
              <button onClick={() => setShowEventModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
              />
              <button
                onClick={handleCreateEvent}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Community Feed Tab
  const FeedTab = () => (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4">
          <div className="text-4xl">{currentUser.profilePic}</div>
          <div className="flex-1">
            <textarea
              placeholder="Share your training experience, photos from events..."
              value={newPost.text}
              onChange={(e) => setNewPost({...newPost, text: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg resize-none"
              rows="3"
            />
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => setNewPost({...newPost, image: '🖼️'})}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Camera size={20} /> Add Photo
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {feedPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{post.authorPic}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{post.author}</h4>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{post.text}</p>
                {post.image && (
                  <div className="mt-4 bg-gray-200 rounded-lg h-64 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                )}
                <div className="flex gap-6 mt-4 text-gray-600">
                  <button className="flex items-center gap-2 hover:text-red-600">
                    ❤️ {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-600">
                    💬 {post.comments} Comments
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-600">
                    ↗️ Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Messages Tab
  const MessagesTab = () => (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        {currentUser.role === 'Admin' && (
          <button
            onClick={() => setShowMessageModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Send size={20} /> Mass Message
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-4">Conversations</h3>
          <div className="space-y-2">
            {messages.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full text-left p-3 rounded-lg hover:bg-gray-100 ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''}`}
              >
                <p className="font-semibold text-sm">
                  {chat.participants.filter(p => p !== currentUser.name).join(', ')}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {chat.messages[chat.messages.length - 1].text}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
          {selectedChat ? (
            <div className="flex flex-col h-96">
              <div className="border-b pb-3 mb-3">
                <h3 className="font-bold">
                  {selectedChat.participants.filter(p => p !== currentUser.name).join(', ')}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === currentUser.name
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm font-semibold">{msg.sender}</p>
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Send Mass Message</h3>
              <button onClick={() => setShowMessageModal(false)}>
                <X size={24} />
              </button>
            </div>
            <textarea
              placeholder="Type your message to all members..."
              value={massMessageText}
              onChange={(e) => setMassMessageText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg resize-none"
              rows="6"
            />
            <button
              onClick={handleMassMessage}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Send to All Members
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Notifications Tab
  const NotificationsTab = () => (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
      <div className="space-y-3">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`bg-white rounded-lg shadow-md p-4 ${!notif.read ? 'border-l-4 border-red-600' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">
                {notif.type === 'event' && '📅'}
                {notif.type === 'message' && '💬'}
                {notif.type === 'badge' && '🏆'}
                {notif.type === 'announcement' && '📢'}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{notif.text}</p>
                <p className="text-sm text-gray-500 mt-1">{notif.timestamp}</p>
              </div>
              {!notif.read && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">New</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Students Tab (Admin only)
  const StudentsTab = () => (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{student.profilePic}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.belt}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {student.status}
                </span>
              </div>
            </div>
            
            {student.badges && student.badges.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Badges:</p>
                <div className="flex flex-wrap gap-2">
                  {student.badges.map((badge, idx) => (
                    <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded flex items-center gap-1">
                      <Trophy size={12} /> {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 text-sm rounded hover:bg-blue-700">
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setShowBadgeModal(true);
                }}
                className="flex-1 bg-yellow-600 text-white py-2 text-sm rounded hover:bg-yellow-700"
              >
                Add Badge
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBadgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Badge to {selectedStudent?.name}</h3>
              <button onClick={() => {setShowBadgeModal(false); setSelectedStudent(null);}}>
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {availableBadges.map(badge => (
                <button
                  key={badge}
                  onClick={() => handleAddBadge(badge)}
                  className="text-left px-4 py-3 border rounded-lg hover:bg-yellow-50 hover:border-yellow-600"
                  disabled={selectedStudent?.badges?.includes(badge)}
                >
                  <span className="flex items-center gap-2">
                    <Trophy size={16} />
                    {badge}
                    {selectedStudent?.badges?.includes(badge) && (
                      <span className="ml-auto text-xs text-green-600">✓ Already earned</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Main Dashboard content
  const DashboardContent = () => {
    if (currentUser.role === 'Admin') {
      return (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-gray-800">247</p>
                </div>
                <Users className="text-red-600" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Classes</p>
                  <p className="text-3xl font-bold text-gray-800">12</p>
                </div>
                <Calendar className="text-blue-600" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Upcoming Events</p>
                  <p className="text-3xl font-bold text-gray-800">{events.length}</p>
                </div>
                <Bell className="text-yellow-600" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">New Posts</p>
                  <p className="text-3xl font-bold text-gray-800">{feedPosts.length}</p>
                </div>
                <Image className="text-green-600" size={40} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => setActiveTab('calendar')} className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
                Create Event
              </button>
              <button onClick={() => setActiveTab('feed')} className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Post Update
              </button>
              <button onClick={() => {setShowMessageModal(true); setActiveTab('messages');}} className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Send Message
              </button>
              <button onClick={() => setActiveTab('students')} className="bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700">
                Manage Students
              </button>
            </div>
          </div>
        </div>
      );
    } else if (currentUser.role === 'Admin II') {
      return (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">My Students</p>
                  <p className="text-3xl font-bold text-gray-800">42</p>
                </div>
                <UserCheck className="text-blue-600" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">My Classes</p>
                  <p className="text-3xl font-bold text-gray-800">5</p>
                </div>
                <BookOpen className="text-green-600" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Messages</p>
                  <p className="text-3xl font-bold text-gray-800">{messages.length}</p>
                </div>
                <MessageSquare className="text-purple-600" size={40} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award size={24} className="text-yellow-600" />
                My Profile
              </h2>
              <div className="text-center">
                <div className="text-6xl mb-4">{currentUser.profilePic}</div>
                <h3 className="text-2xl font-bold">{currentUser.name}</h3>
                <p className="text-gray-600 mb-4">{currentUser.bio}</p>
                {currentUser.badges && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">My Badges:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentUser.badges.map((badge, idx) => (
                        <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full flex items-center gap-1">
                          <Trophy size={14} /> {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-blue-600" />
                Upcoming Events
              </h2>
              <div className="space-y-3">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className={`${currentUser.role === 'Admin' ? 'bg-red-600' : currentUser.role === 'Admin II' ? 'bg-blue-600' : 'bg-gray-800'} text-white p-4 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Panamerican TKD Academy</h1>
            <p className="text-sm opacity-90">{currentUser.role} Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {currentUser.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-black bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <NavTabs />

      {activeTab === 'dashboard' && <DashboardContent />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'feed' && <FeedTab />}
      {activeTab === 'messages' && <MessagesTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'students' && currentUser.role === 'Admin' && <StudentsTab />}
    </div>
  );
};

export default PanamericanTKDApp;