import { Heart, Info, MessageCircle, ShoppingCart, Star, Plus } from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

const CATEGORY_STYLES = {
  Kopi:      'bg-amber-100/95 text-amber-900 border-amber-300/70',
  'Non-Kopi':'bg-emerald-100/95 text-emerald-900 border-emerald-300/70',
  Makanan:   'bg-orange-100/95 text-orange-900 border-orange-300/70',
  Snack:     'bg-rose-100/95 text-rose-900 border-rose-300/70',
  default:   'bg-white/90 text-zinc-700 border-zinc-300/70',
};

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
  const isMaxInCart  = cartQuantity >= stock;

  const catStyle = CATEGORY_STYLES[menu.category] || CATEGORY_STYLES.default;

  return (
    <article className="group relative flex flex-col bg-white border border-stone-200/80 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-900/8 transition-all duration-300 hover:-translate-y-1.5">

      {/* ── Image ─────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 flex items-center justify-center">
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            if (menu.fallbackUrl && e.currentTarget.src !== menu.fallbackUrl) {
              e.currentTarget.src = menu.fallbackUrl;
            } else {
              e.currentTarget.src = '/favicon.svg';
            }
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1 items-center">
          <span className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border backdrop-blur-md shadow-sm ${catStyle}`}>
            {menu.category}
          </span>
          <span className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm ${
            isOutOfStock
              ? 'bg-rose-100/95 text-rose-800 border-rose-300/70'
              : stock <= 5
              ? 'bg-amber-100/95 text-amber-900 border-amber-300/70'
              : 'bg-white/90 text-zinc-700 border-white/60'
          }`}>
            {isOutOfStock ? 'Stok Habis' : `Stok: ${stock}`}
          </span>
        </div>

        {/* Favorite button */}
        <button
          type="button"
          onClick={() => onToggleFavorite(menu)}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
            isFavorite
              ? 'bg-rose-500 text-white scale-110 shadow-rose-500/40'
              : 'bg-white/85 hover:bg-white text-zinc-500 hover:text-rose-500 hover:scale-110'
          }`}
          title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${isFavorite ? 'fill-white text-white' : ''}`} />
        </button>

        {/* Rating bottom-left */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 shadow-sm">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[11px] sm:text-xs font-bold text-white">{Number(menu.rating).toFixed(1)}</span>
          {menu.reviews?.length > 0 && (
            <span className="text-[9px] sm:text-[10px] text-white/60">({menu.reviews.length})</span>
          )}
        </div>

        {/* Cart indicator bottom-right */}
        {cartQuantity > 0 && (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] sm:text-xs font-black shadow-md shadow-amber-500/40">
            {cartQuantity}× di keranjang
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <div className="mb-3">
          <h4 className="text-sm sm:text-[15px] font-bold text-zinc-900 line-clamp-1 group-hover:text-amber-700 transition-colors duration-200">
            {menu.name}
          </h4>
          <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed min-h-[30px]">
            {menu.description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2.5 border-t border-stone-100">
          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-semibold uppercase tracking-widest block mb-0.5">Harga</span>
          <span className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900">
            {formatRupiah(menu.price)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mt-3">
          {/* Info */}
          <button
            type="button"
            onClick={() => onOpenInfo(menu)}
            className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/70 hover:border-sky-300 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Lihat Detail"
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="text-[9px] sm:text-[10px] font-bold">Info</span>
          </button>

          {/* Favorit */}
          <button
            type="button"
            onClick={() => onToggleFavorite(menu)}
            className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm'
                : 'bg-stone-50 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 border-stone-200 hover:border-rose-200'
            }`}
            title={isFavorite ? 'Batalkan Favorit' : 'Suka / Favorit'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 transition-all ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span className="text-[9px] sm:text-[10px] font-bold">{isFavorite ? 'Disukai' : 'Suka'}</span>
          </button>

          {/* Komentar */}
          <button
            type="button"
            onClick={() => onOpenComment(menu)}
            className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/70 hover:border-emerald-300 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Tulis Ulasan"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="text-[9px] sm:text-[10px] font-bold">Ulas</span>
          </button>

          {/* Add to Cart */}
          <button
            type="button"
            disabled={isOutOfStock || isMaxInCart}
            onClick={() => onAddToCart(menu)}
            className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border font-bold transition-all duration-200 ${
              isOutOfStock
                ? 'bg-stone-100 text-zinc-400 border-stone-200 cursor-not-allowed'
                : isMaxInCart
                ? 'bg-amber-100 text-amber-700 border-amber-200 cursor-not-allowed'
                : 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95'
            }`}
            title={isOutOfStock ? 'Stok Habis' : isMaxInCart ? 'Maks stok tercapai' : 'Tambah ke Keranjang'}
          >
            {isOutOfStock || isMaxInCart
              ? <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
              : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 stroke-[3]" />
            }
            <span className="text-[9px] sm:text-[10px] font-black">
              {isOutOfStock ? 'Habis' : isMaxInCart ? 'Max' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
