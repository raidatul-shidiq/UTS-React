import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  icon: Icon,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full ${maxWidth} bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden z-10 transition-all transform animate-scale-up my-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
            {Icon && (
              <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
            <h3 className="text-sm sm:text-lg font-bold text-zinc-900 tracking-tight truncate">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 sm:p-1.5 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-stone-200 transition-colors shrink-0"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto custom-scrollbar text-zinc-700">
          {children}
        </div>
      </div>
    </div>
  );
}
