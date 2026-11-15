/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationContext = createContext(null);

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-welcome',
    title: 'Selamat Datang di KopiKu! ☕',
    message: 'Gunakan kode promo  untuk diskon 25% pemesanan pertamamu!',
    type: 'promo',
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: 'notif-beans',
    title: 'Arabika Gayo Baru Tiba',
    message: 'Biji kopi pilihan baru saja selesai di-roasting dengan profile medium to dark.',
    type: 'info',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: true,
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useLocalStorage('kopiku_notifications', DEFAULT_NOTIFICATIONS);

  const addNotification = useCallback((title, message, type = 'info') => {
    const newNotif = {
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, [setNotifications]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  }, [setNotifications]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  }, [setNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
