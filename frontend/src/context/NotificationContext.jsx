import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info') => {
    setNotifications((prev) => [...prev, { message, type, id: Date.now() }]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
        {notifications.map((n) => (
          <div key={n.id} style={{ marginBottom: 8, padding: '8px 16px', background: n.type === 'error' ? '#f44336' : '#2196f3', color: '#fff', borderRadius: 4 }}>
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
