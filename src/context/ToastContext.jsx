/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 shrink-0" />;
    }
  };

  const getToastBorder = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-white text-emerald-950 shadow-emerald-500/10';
      case 'error':
        return 'border-rose-200 bg-white text-rose-950 shadow-rose-500/10';
      case 'warning':
        return 'border-amber-200 bg-white text-amber-950 shadow-amber-500/10';
      default:
        return 'border-stone-200 bg-white text-zinc-900 shadow-stone-500/10';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <aside aria-label="Notifikasi popup" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-in ${getToastBorder(
              toast.type
            )}`}
          >
            {getToastIcon(toast.type)}
            <div className="flex-1 text-sm font-semibold leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 rounded-lg hover:bg-stone-100 shrink-0"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
