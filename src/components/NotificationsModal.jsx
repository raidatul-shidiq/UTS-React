import { useState } from 'react';
import Modal from './Modal';
import {
  Bell,
  Heart,
  MessageCircle,
  ShoppingBag,
  Tag,
  Receipt,
  RotateCcw,
  CheckCheck,
  Trash2,
  Info,
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationsModal({ isOpen, onClose }) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
  } = useNotifications();

  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-emerald-600" />;
      case 'cart':
        return <ShoppingBag className="w-4 h-4 text-amber-600" />;
      case 'promo':
        return <Tag className="w-4 h-4 text-purple-600" />;
      case 'order':
        return <Receipt className="w-4 h-4 text-blue-600" />;
      case 'reset':
        return <RotateCcw className="w-4 h-4 text-orange-600" />;
      default:
        return <Info className="w-4 h-4 text-amber-600" />;
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffSec = Math.floor((now - date) / 1000);

      if (diffSec < 60) return 'Baru saja';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)} menit lalu`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} jam lalu`;
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pusat Notifikasi Aktivitas"
      icon={Bell}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Controls: Filter & Bulk Actions */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'unread'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Belum Dibaca ({unreadCount})
            </button>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="p-1.5 text-zinc-500 hover:text-amber-700 rounded-lg hover:bg-stone-100 transition-colors"
                title="Tandai semua telah dibaca"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearNotifications}
                className="p-1.5 text-zinc-500 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                title="Hapus semua riwayat notifikasi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {filteredNotifs.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40 text-stone-400" />
              <p className="text-xs">
                {filter === 'unread'
                  ? 'Tidak ada notifikasi baru yang belum dibaca.'
                  : 'Belum ada notifikasi aktivitas tersimpan.'}
              </p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-start ${
                  notif.isRead
                    ? 'bg-stone-50 border-stone-200 text-zinc-600'
                    : 'bg-amber-50/70 border-amber-300/80 shadow-sm text-zinc-900'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-stone-200 shrink-0 mt-0.5 shadow-sm">
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5
                      className={`text-xs font-bold truncate ${
                        notif.isRead ? 'text-zinc-700' : 'text-zinc-900'
                      }`}
                    >
                      {notif.title}
                    </h5>
                    <span className="text-[10px] text-zinc-400 shrink-0">
                      {formatTime(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {!notif.isRead && (
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
