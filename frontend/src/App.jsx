import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import { Container, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const App = () => (
  <Container maxWidth="sm" className="min-h-screen bg-gray-100 flex flex-col px-2 py-4 md:px-8 md:py-8">
    {(() => {
      const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/feed', label: 'Feed' },
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/profile', label: 'Profile' },
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ];
      const isMobile = useMediaQuery('(max-width:768px)');
      const [drawerOpen, setDrawerOpen] = useState(false);
      const location = useLocation();
      return isMobile ? (
        <>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1200 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <List sx={{ minWidth: 200 }}>
              {navLinks.map(link => (
                <ListItem button key={link.to} component={Link} to={link.to} selected={location.pathname === link.to} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        <nav className="mb-4 flex flex-wrap gap-2 md:gap-4 justify-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition">
              {link.label}
            </Link>
          ))}
        </nav>
      );
    })()}
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        {/* Add more routes as needed */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  </Container>
);

export default App;


