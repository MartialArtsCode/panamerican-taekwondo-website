
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
