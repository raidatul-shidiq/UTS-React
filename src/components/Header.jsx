import { Coffee, Search, Bell, ShoppingCart, History, X, Flame } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white text-center py-1.5 px-4 text-[11px] sm:text-xs font-semibold tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <Flame className="w-3 h-3 text-amber-200 shrink-0" />
          Gunakan kode <span className="font-black bg-white/20 px-1.5 py-0.5 rounded mx-1 tracking-widest">UTS25</span>
          untuk diskon 25% — Hari ini saja!
          <Flame className="w-3 h-3 text-amber-200 shrink-0" />
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-stone-200/80 shadow-sm shadow-stone-200/50">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 md:py-0 md:h-[72px] flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">

          {/* Top Row on Mobile: Logo & Actions */}
          <div className="flex items-center justify-between w-full md:w-auto shrink-0">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 shrink-0">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 leading-none">
                    Kopi<span className="text-amber-600">Ku</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-wider leading-none">
                    Premium
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mt-0.5">
                  Artisan Coffee & Kitchen
                </span>
              </div>
            </div>

            {/* Action Buttons on Mobile */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={onOpenHistory}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-50 hover:border-amber-300 text-zinc-600 hover:text-amber-700 border border-stone-200 transition-all duration-200 shadow-sm"
                title="Riwayat Transaksi"
              >
                <History className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenNotifications}
                className="relative p-2 rounded-xl bg-stone-100 hover:bg-amber-50 hover:border-amber-300 text-zinc-600 hover:text-amber-700 border border-stone-200 transition-all duration-200 shadow-sm"
                title="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm shadow-rose-500/40">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/30 active:scale-95 transition-all duration-200"
                title="Buka Keranjang"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full bg-white text-amber-700 text-[9px] font-black flex items-center justify-center border border-amber-300">
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

          {/* Search Input Bar */}
          <div className="w-full md:flex-1 md:max-w-lg md:mx-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-amber-600 transition-colors duration-200" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kopi, makanan, snack..."
                className="w-full pl-10 pr-9 py-2.5 bg-stone-100 hover:bg-white focus:bg-white border border-transparent hover:border-stone-300 focus:border-amber-500 rounded-2xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-3 focus:ring-amber-500/15 transition-all duration-200 shadow-sm focus:shadow-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenHistory}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-50 text-zinc-700 hover:text-amber-800 border border-stone-200 hover:border-amber-200 transition-all duration-200 shadow-sm"
              title="Riwayat Transaksi"
            >
              <History className="w-4 h-4 text-amber-600 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-xs font-bold">Riwayat</span>
            </button>

            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-50 text-zinc-700 hover:text-amber-800 border border-stone-200 hover:border-amber-200 transition-all duration-200 shadow-sm"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 text-amber-600 group-hover:animate-wiggle" />
              <span className="text-xs font-bold">Notifikasi</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm shadow-rose-500/40 animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 active:scale-95"
              title="Buka Keranjang Belanja"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-amber-700 text-[9px] font-black flex items-center justify-center border-2 border-amber-500 shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[9px] font-bold text-amber-100 uppercase tracking-widest">Keranjang</span>
                <span className="text-sm font-black">{formatRupiah(pricing.total)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
