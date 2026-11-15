import { Heart, Info, MessageCircle, ShoppingCart, Star } from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

export default function MenuCard({
  menu,
  isFavorite,
  onToggleFavorite,
  onOpenInfo,
  onOpenComment,
  onAddToCart,
  cartQuantity = 0,
  currentStock,
}) {
  const stock = typeof currentStock === 'number' ? currentStock : menu.stock;
  const isOutOfStock = stock <= 0;
  const isMaxInCart = cartQuantity >= stock;

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'Kopi':
        return 'bg-amber-100/90 text-amber-900 border-amber-300';
      case 'Non-Kopi':
        return 'bg-emerald-100/90 text-emerald-900 border-emerald-300';
      case 'Makanan':
        return 'bg-orange-100/90 text-orange-900 border-orange-300';
      case 'Snack':
        return 'bg-rose-100/90 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-zinc-800 border-stone-300';
    }
  };

  return (
    <div className="group relative flex flex-col bg-white border border-stone-200/90 hover:border-amber-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (menu.fallbackUrl && e.currentTarget.src !== menu.fallbackUrl) {
              e.currentTarget.src = menu.fallbackUrl;
            } else {
              e.currentTarget.src = '/favicon.svg';
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category & Stock Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5 items-center">
          <span
            className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border backdrop-blur-md shadow-sm ${getCategoryBadgeColor(
              menu.category
            )}`}
          >
            {menu.category}
          </span>
          <span
            className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm ${
              isOutOfStock
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : stock <= 5
                ? 'bg-amber-100 text-amber-850 border-amber-300'
                : 'bg-white/90 text-zinc-800 border-stone-200'
            }`}
          >
            {isOutOfStock ? 'Stok Habis' : `Stok: ${stock}`}
          </span>
        </div>

        {/* Favorite Quick Button */}
        <button
          type="button"
          onClick={() => onToggleFavorite(menu)}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
            isFavorite
              ? 'bg-white text-rose-600 border border-rose-300 shadow-rose-500/20 scale-110'
              : 'bg-white/80 hover:bg-white text-zinc-500 hover:text-zinc-900 border border-stone-200'
          }`}
          title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
              isFavorite ? 'fill-rose-600 text-rose-600 scale-110' : ''
            }`}
          />
        </button>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-[11px] sm:text-xs font-bold text-zinc-800">
            {Number(menu.rating).toFixed(1)}
          </span>
          {menu.reviews && menu.reviews.length > 0 && (
            <span className="text-[9px] sm:text-[10px] text-zinc-500">
              ({menu.reviews.length})
            </span>
          )}
        </div>

        {/* In Cart Indicator */}
        {cartQuantity > 0 && (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] sm:text-xs font-bold shadow-md">
            {cartQuantity} di keranjang
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5">
        <div className="mb-2">
          <h4 className="text-sm sm:text-base font-bold text-zinc-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
            {menu.name}
          </h4>
          <p className="text-xs text-zinc-600 line-clamp-2 mt-1 min-h-[30px] sm:min-h-[32px] leading-relaxed">
            {menu.description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-stone-100 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">
              Harga
            </span>
            <span className="text-base sm:text-lg font-black text-amber-700">
              {formatRupiah(menu.price)}
            </span>
          </div>
        </div>

        {/* 4 Required Action Buttons: Info, Suka / Favorit, Komentar, Add */}
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mt-3 sm:mt-4 pt-1 sm:pt-2">
          {/* 1. Info Button */}
          <button
            type="button"
            onClick={() => onOpenInfo(menu)}
            className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 hover:text-zinc-900 border border-stone-200 transition-all duration-200"
            title="Lihat Detail Menu"
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 text-blue-600" />
            <span className="text-[9px] sm:text-[10px] font-semibold truncate max-w-full">Info</span>
          </button>

          {/* 2. Suka / Favorit Button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(menu)}
            className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border transition-all duration-200 ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-zinc-700 hover:text-zinc-900 border-stone-200'
            }`}
            title={isFavorite ? 'Batalkan Favorit' : 'Suka / Favorit'}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${
                isFavorite ? 'fill-rose-600 text-rose-600' : 'text-zinc-500'
              }`}
            />
            <span className="text-[9px] sm:text-[10px] font-semibold truncate max-w-full">
              {isFavorite ? 'Disukai' : 'Suka'}
            </span>
          </button>

          {/* 3. Komentar Button */}
          <button
            type="button"
            onClick={() => onOpenComment(menu)}
            className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 hover:text-zinc-900 border border-stone-200 transition-all duration-200"
            title="Tulis Ulasan & Komentar"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 text-emerald-600" />
            <span className="text-[9px] sm:text-[10px] font-semibold truncate max-w-full">Ulas</span>
          </button>

          {/* 4. Add to Cart Button */}
          <button
            type="button"
            disabled={isOutOfStock || isMaxInCart}
            onClick={() => onAddToCart(menu)}
            className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border transition-all duration-200 ${
              isOutOfStock
                ? 'bg-stone-100 text-zinc-400 border-stone-200 cursor-not-allowed'
                : isMaxInCart
                ? 'bg-amber-100 text-amber-700 border-amber-200 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700 text-white font-bold border-amber-600 shadow-sm hover:shadow-md active:scale-95'
            }`}
            title={
              isOutOfStock
                ? 'Stok Habis'
                : isMaxInCart
                ? 'Jumlah di keranjang sudah mencapai batas stok'
                : 'Tambah ke Keranjang'
            }
          >
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold truncate max-w-full">
              {isOutOfStock ? 'Habis' : isMaxInCart ? 'Max' : '+ Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
