import { Coffee, Search, Bell, ShoppingCart, History, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { formatRupiah } from '../utils/pricing';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenCart,
  onOpenNotifications,
  onOpenHistory,
}) {
  const { totalItems, pricing } = useCart();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
        {/* Top Row on Mobile: Logo & Actions */}
        <div className="flex items-center justify-between w-full md:w-auto shrink-0">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black tracking-tight text-zinc-900 flex items-center">
                Kopi<span className="text-amber-600">Ku</span>
              </span>
              <span className="hidden sm:block text-[10px] font-bold tracking-widest text-amber-700/80 uppercase">
                Artisan Coffee & Kitchen
              </span>
            </div>
          </div>

          {/* Action Buttons on Mobile: visible right next to logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenHistory}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 border border-stone-200 transition-colors shadow-sm"
              title="Riwayat Transaksi"
            >
              <History className="w-4 h-4 text-amber-600" />
            </button>

            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 border border-stone-200 transition-colors shadow-sm"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 text-amber-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center animate-pulse shadow-sm">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
              title="Buka Keranjang"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full bg-white text-amber-700 text-[9px] font-black flex items-center justify-center border border-amber-600">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-black">
                {totalItems > 0 ? formatRupiah(pricing.total) : 'Cart'}
              </span>
            </button>
          </div>
        </div>

        {/* Search Input Bar (Responsive on all screen sizes) */}
        <div className="w-full md:flex-1 md:max-w-md md:mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kopi, makanan, snack..."
              className="w-full pl-10 pr-9 py-2 sm:py-2.5 bg-stone-100 hover:bg-white focus:bg-white border border-stone-300 hover:border-amber-500 focus:border-amber-600 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Action Buttons (hidden on mobile, shown on md and above) */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 hover:text-zinc-900 border border-stone-200 transition-all duration-200 flex items-center gap-2 group shadow-sm"
            title="Riwayat Transaksi"
          >
            <History className="w-4 h-4 text-amber-600 group-hover:rotate-[-20deg] transition-transform" />
            <span className="text-xs font-bold">Riwayat</span>
          </button>

          {/* Notifications Button with unread badge */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 hover:text-zinc-900 border border-stone-200 transition-all duration-200 flex items-center gap-2 shadow-sm"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold">Notifikasi</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:top-1.5 sm:right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse shadow-md shadow-rose-600/30">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all duration-200 active:scale-95"
            title="Buka Keranjang Belanja"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-0.5 rounded-full bg-white text-amber-700 text-[9px] font-black flex items-center justify-center border border-amber-600 shadow-sm">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-semibold text-amber-100 uppercase tracking-wider">
                Keranjang
              </span>
              <span className="text-xs font-black">
                {formatRupiah(pricing.total)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
